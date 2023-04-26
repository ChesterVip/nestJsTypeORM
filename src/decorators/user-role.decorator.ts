import { SetMetadata } from '@nestjs/common';

export const UserRole = (role: string) => SetMetadata('role', role);
