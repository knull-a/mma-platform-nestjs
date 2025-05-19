import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('DateTime', () => Date)
export class DateScalar implements CustomScalar<string, Date | null> {
  description = 'Date custom scalar type';

  parseValue(value: string): Date {
    return new Date(value);
  }

  serialize(value: Date | string): string {
    if (value instanceof Date) {
      return value.toISOString();
    }

    // Handle string dates
    try {
      const date = new Date(value);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${value}`);
      }
      return date.toISOString();
    } catch (error) {
      throw new Error(`Error serializing date: ${error.message}`);
    }
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
