import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../domain/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';
import { UpdateFighterInput } from './dto/update-fighter.input';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('fighters')
@Controller('fighters')
export class FightersController {
  constructor(
    @InjectRepository(Fighter)
    private fighterRepository: Repository<Fighter>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all fighters' })
  @ApiResponse({
    status: 200,
    description: 'Returns all fighters',
    type: [Fighter],
  })
  async findAll(): Promise<Fighter[]> {
    return this.fighterRepository.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a fighter by ID' })
  @ApiParam({ name: 'id', description: 'The fighter ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the fighter',
    type: Fighter,
  })
  @ApiResponse({ status: 404, description: 'Fighter not found' })
  async findOne(@Param('id') id: string): Promise<Fighter> {
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new fighter' })
  @ApiBody({ type: CreateFighterInput })
  @ApiResponse({
    status: 201,
    description: 'The fighter has been created successfully',
    type: Fighter,
  })
  async create(@Body() createFighterDto: CreateFighterInput): Promise<Fighter> {
    const fighter = this.fighterRepository.create(createFighterDto);
    return this.fighterRepository.save(fighter);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a fighter by ID' })
  @ApiParam({ name: 'id', description: 'The fighter ID' })
  @ApiBody({ type: UpdateFighterInput })
  @ApiResponse({
    status: 200,
    description: 'The fighter has been updated successfully',
    type: Fighter,
  })
  @ApiResponse({ status: 404, description: 'Fighter not found' })
  async update(
    @Param('id') id: string,
    @Body() updateFighterDto: UpdateFighterInput,
  ): Promise<Fighter> {
    await this.fighterRepository.update(id, updateFighterDto);
    return this.fighterRepository.findOneOrFail({ where: { id } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a fighter by ID' })
  @ApiParam({ name: 'id', description: 'The fighter ID' })
  @ApiResponse({
    status: 200,
    description: 'The fighter has been deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Fighter not found' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.fighterRepository.delete(id);
  }
} 