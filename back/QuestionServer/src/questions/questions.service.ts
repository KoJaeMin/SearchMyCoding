import { UpdateQuestionDto } from './../dto/UpdateQuestion.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { Question } from '../entities/questions.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository : Repository<Question>
    ){}

    async getAllQuestions() : Promise<Question[]>{
        return await this.questionsRepository.find();
    }

    async getOneQuestion(questionId : number) : Promise<Question>{
        const FoundQuestion : Question = await this.questionsRepository.findOne({id : questionId});
        if(!FoundQuestion)
            throw new NotFoundException(`Question with Id ${questionId} is not found.`);
        return FoundQuestion;
    }

    async getQuestionsWithType(questionType : string) : Promise<Question[]>{
        const FoundQuestions : Question[] = await this.questionsRepository.find({
            where : {
                questionType : questionType
            }
        })
        if(!FoundQuestions || FoundQuestions.length === 0)
            throw new NotFoundException(`Questions with type ${questionType} is not found.`);
        return FoundQuestions;
    }

    async createQuestion(createQuestionDto : CreateQuestionDto) : Promise<void>{
        const {questionType, contents, activate} = createQuestionDto;
        const newQuestion : Question = this.questionsRepository.create({
            questionType : questionType,
            contents : contents,
            activate : activate
        })
        await this.questionsRepository.insert(newQuestion);
    }

    async patchQuestion(questionId :number, updateQuestionData : UpdateQuestionDto) : Promise<void>{
        try{
            this.getOneQuestion(questionId);
        }catch(err){}
        await this.questionsRepository.update({id : questionId},updateQuestionData);
    }
}
