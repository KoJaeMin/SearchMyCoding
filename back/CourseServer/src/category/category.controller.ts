import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/dto/CreateCategory.dto';
import { UpdateCategoryDto } from 'src/dto/UpdateCategory.dto';
import { Category } from 'src/entities/category.entity';
import { CourseCategory } from 'src/entities/coursecategory.entity';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService : CategoryService
    ){}

    @Get()
    @ApiOperation({
        "summary" : "모든 카테고리 조회하는 요청",
        "description" : "모든 카테고리 배열 형태로 반환한다."
    })
    async getAllCategory() : Promise<Category[]>{
        return await this.categoryService.getAllCategory();
    }

    @Get(':name')
    @ApiOperation({
        "summary" : "이름을 이용한 카테고리 조회하는 요청",
        "description" : "이름을 이용하여 카테고리을 조회하고 json 형태로 반환한다.(단, 이름에 맞는 카테고리을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneCategory(@Param("name") categoryName : string) : Promise<Category>{
        return await this.categoryService.getOneCategory(categoryName);
    }


    @Post('')
    @ApiOperation({
        "summary":"카테고리을 생성하는 요청",
        "description":"body를 CreateCategoryDto에 맞춰 요청해야한다."
    })
    async createCategory(@Body() createCategoryDto : CreateCategoryDto){
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Patch(':name')
    @ApiOperation({
        "summary" : "이름을 이용하여 카테고리의 일부를 수정하는 요청",
        "description" : "이름을 존재하여야 하며 body를 UpdateCategoryDto에 맞춰 요청해야한다."
    })
    async patchCategory(@Param('name') categoryName : string,@Body() updateCategoryDto : UpdateCategoryDto){
        return this.categoryService.patchCategory(categoryName, updateCategoryDto);
    }
}