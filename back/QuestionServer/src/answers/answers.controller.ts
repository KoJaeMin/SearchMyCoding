import { UpdateAnswerDto } from './../dto/UpdateAnswer.dto';
import { Answer } from 'src/entities/answers.entity';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('answers')
export class AnswerController {
    constructor(private readonly answerService : AnswersService){}

    @Get()
    async getAllAnswers(){
        return await this.answerService.getAllAnswer();
    }

    @Get(':id')
    async getOneAnswer(@Param("id") answerId : number) : Promise<Answer>{
        return await this.answerService.getOneAnswer(answerId);
    }

    @Get('question/:id')
    async getAnswerAboutQuestion(@Param("id") questionId : number) : Promise<Answer[]> {
        return await this.answerService.getAnswerAboutQuestion(questionId);
    }

    @Post('')
    createAnswer(@Body() createAnswerDto : CreateAnswerDto){
        return this.answerService.createAnswer(createAnswerDto);
    }

    @Patch(':id')
    patchAnswer(@Param('id') answerId : number,@Body() updateAnswerDto : UpdateAnswerDto){
        return this.answerService.patchAnswer(answerId, updateAnswerDto);
    }
}
