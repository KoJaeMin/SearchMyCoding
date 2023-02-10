import { UpdateAnswerDto } from '../dto/UpdateAnswer.dto';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Answer } from '../entities/answers.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer)
        private answerRepository : Repository<Answer>
    ){}

    async getAllAnswer() : Promise<Answer[]>{
        return await this.answerRepository.find();
    }

    async getOneAnswer(answerId : number) : Promise<Answer>{
        const FoundAnswer : Answer = await this.answerRepository.findOne({id : answerId});
        if(!FoundAnswer)
            throw new NotFoundException(`Answer with Id ${answerId} is not found.`);
        return FoundAnswer;
    }

    async getAnswerAboutQuestion(questionId : number) : Promise<Answer[]>{
        const FoundAnswers : Answer[] = await this.answerRepository.find({
            where : {
                questionId : questionId
            }
        })
        if(!FoundAnswers)
            throw new NotFoundException(`Answer About Question with Id ${questionId} is not found`);
        return FoundAnswers;
    }

    async createAnswer(createAnswerDto : CreateAnswerDto) : Promise<void>{
        const {answerType, questionId, contents} = createAnswerDto;
        const newAnswer : Answer = this.answerRepository.create({
            answerType : answerType,
            questionId : questionId,
            contents : contents
        })
        await this.answerRepository.insert(newAnswer);
    }

    async patchAnswer(answerId :number, updateAnswerDto : UpdateAnswerDto) : Promise<void>{
        try{
            this.getOneAnswer(answerId);
        }catch(err){}
        await this.answerRepository.update({id : answerId}, updateAnswerDto);
    }
}
