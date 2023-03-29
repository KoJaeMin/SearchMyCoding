import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/CreateCategory.dto';
import { UpdateCategoryDto } from 'src/dto/UpdateCategory.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository : Repository<Category>
    ){}

    async getAllCategory() : Promise<Category[]>{
        return await this.categoryRepository.find();
    }

    async getOneCategory(categoryName : string) : Promise<Category>{
        const FoundCategory : Category = await this.categoryRepository.findOneBy({name : categoryName})
        if(!FoundCategory)
            throw new NotFoundException(`Category with Name ${categoryName} is not found.`);
        return FoundCategory;
    }

    async createCategory(createCategoryDto : CreateCategoryDto) : Promise<void>{
        const {name} = createCategoryDto;
        const newCategory : Category = this.categoryRepository.create({
            name : name
        })
        await this.categoryRepository.insert(newCategory);
    }

    async patchCategory(categoryName : string, updateCategoryDto : UpdateCategoryDto) : Promise<void>{
        try{
            await this.getOneCategory(categoryName);
        }catch(err){
            throw err;
        }
        await this.categoryRepository.update({name : categoryName},updateCategoryDto);
    }
}
