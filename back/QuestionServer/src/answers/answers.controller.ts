import { Answer } from 'src/entities/answers.entity';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('answers')
export class AnswerController {
    constructor(private readonly questionTypesService : AnswersService){}

    @Get()
    getAllQuestionTypes(){
        this.questionTypesService.getAllAnswer()
    }

    @Get(':id')
    async getOneQuestionType(@Param("id") questionId : number) : Promise<Answer>{
        return await this.questionTypesService.getOneAnswer(questionId);
    }

    @Post('type')
    createQuestionType(@Body() questionTypeDto : CreateAnswerDto){
        return this.questionTypesService.createAnswer(questionTypeDto);
    }

    @Patch(':id')
    patchQuestion(@Param('id') questionId : number,@Body() questionTypeDto : CreateAnswerDto){
        return this.questionTypesService.patchAnswer(questionId, questionTypeDto);
    }
}
