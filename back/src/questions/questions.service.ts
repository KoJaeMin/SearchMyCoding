import { QuestionType } from './../entities/questionTypes.entity';
import { QuestionTypeDto } from './../dto/QuestionType.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionDto } from '../dto/Question.dto';
import { Question } from '../entities/questions.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository : Repository<Question>,
        
        @InjectRepository(QuestionType)
        private questionTypeRepository : Repository<QuestionType>
    ){}

    getAllQuestions() : Promise<Question[]>{
        return this.questionsRepository.find();
    }

    async getOneQusesion(questionId : number) : Promise<Question>{
        const FoundQuestion : Question = await this.questionsRepository.findOne({id : questionId});
        if(!FoundQuestion)
            throw new NotFoundException(`Course with Id ${questionId} is not found.`);
        return FoundQuestion;
    }

    async createQuestion(QuestionDto : QuestionDto) : Promise<void>{
        const {typeId, degree, contents} = QuestionDto;
        const newQuestion : Question = this.questionsRepository.create({
            typeId : typeId,
            degree : degree,
            contents : contents
        })
        await this.questionsRepository.insert(newQuestion)
    }

    async createQuestionType(questionTypeDto : QuestionTypeDto) : Promise<void>{
        const {TypeName} = questionTypeDto;
        const newQuestionType : QuestionType = this.questionTypeRepository.create({
            TypeName : TypeName,
        })
    }

    async patchQuestion(questionId :number, updateQuestionData : QuestionDto) : Promise<void>{
        try{
            this.getOneQusesion(questionId);
        }catch(err){}
        await this.questionsRepository.update({id : questionId},updateQuestionData);
    }
}
