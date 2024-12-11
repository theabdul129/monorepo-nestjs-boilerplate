import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  // Method to hash data
  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData;
  }

  // Method to compare hashed data
  async compareData(data: string, hashedData: string): Promise<boolean> {
    return bcrypt.compare(data, hashedData);
  }
}
