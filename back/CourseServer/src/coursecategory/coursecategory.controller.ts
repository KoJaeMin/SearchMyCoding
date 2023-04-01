import { Controller } from '@nestjs/common';
import { CoursecategoryService } from './coursecategory.service';

@Controller('coursecategory')
export class CoursecategoryController {
    constructor(
        private readonly coursecategoryService : CoursecategoryService
    ){}
}
