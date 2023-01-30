import { QuestionTypeDto } from '../dto/QuestionType.dto';
import { QuestionType } from '../entities/questiontypes.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionTypesService {
    constructor(
        @InjectRepository(QuestionType)
        private questionTypeRepository : Repository<QuestionType>
    ){}

    async getAllQuestionTypes() : Promise<QuestionType[]>{
        return await this.questionTypeRepository.find();
    }

    async getOneQuestionType(questionTypeId : number) : Promise<QuestionType>{
        const FoundQuestion : QuestionType = await this.questionTypeRepository.findOne({id : questionTypeId});
        if(!FoundQuestion)
            throw new NotFoundException(`Question Type with Id ${questionTypeId} is not found.`);
        return FoundQuestion;
    }

    async createQuestionType(questionTypeDto : QuestionTypeDto) : Promise<void>{
        const {typename, description} = questionTypeDto;
        const newQuestionType : QuestionType = this.questionTypeRepository.create({
            typename : typename,
            description : description
        })
        await this.questionTypeRepository.insert(newQuestionType);
    }

    async patchQuestionType(questionTypeId :number, updateQuestionTypeData : QuestionTypeDto) : Promise<void>{
        try{
            this.getOneQuestionType(questionTypeId);
        }catch(err){}
        await this.questionTypeRepository.update({id : questionTypeId}, updateQuestionTypeData);
    }
}
