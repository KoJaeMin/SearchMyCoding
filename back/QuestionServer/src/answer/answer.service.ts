import { UpdateAnswerDto } from '../dto/UpdateAnswer.dto';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Answer } from '../entities/answer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository : Repository<Answer>,
        @InjectRepository(Question)
        private readonly questionRepository : Repository<Question>
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
        const FoundQuestion : Question = await this.questionRepository.findOne({id:questionId},{
            relations : ['answer']
        });
        if(!FoundQuestion)
            throw new NotFoundException(`Question with Id ${questionId} is not found`);
        
        const FoundAnswer : Answer[] = [];
        for(const answerId of FoundQuestion.answer)
            FoundAnswer.push(await this.getOneAnswer(answerId));
        
        return FoundAnswer;
    }

    async createAnswer(createAnswerDto : CreateAnswerDto) : Promise<void>{
        const {answerType, questionId, contents} = createAnswerDto;
        const question : Question = await this.questionRepository.findOne({id:questionId},{
            relations : ['answer']
        });
        const newAnswer : Answer = this.answerRepository.create({
            answerType : answerType,
            question : questionId,
            contents : contents
        });
        await this.answerRepository.insert(newAnswer);
        const answer : Answer = await this.answerRepository.findOne({contents : contents});
        
        question.answer.push(answer.id);
        await this.questionRepository.save(question);
    }

    async patchAnswer(answerId :number, updateAnswerDto : UpdateAnswerDto) : Promise<void>{
        try{
            await this.getOneAnswer(answerId);
        }catch(err){
            throw err;
        }
        await this.answerRepository.update({id : answerId}, updateAnswerDto);
    }
}
