import { UpdateQuestionDto } from './../dto/UpdateQuestion.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Question } from 'src/entities/questions.entity';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService : QuestionsService){}

    @Get()
    async getAllQuestions(){
        return await this.questionService.getAllQuestions();
    }

    @Get(':id')
    async getOneQuestion(@Param("id") questionId : number) : Promise<Question>{
        return await this.questionService.getOneQuestion(questionId);
    }

    @Get('type/:type')
    async getQuestionsWithType(@Param("type") questionType : string) : Promise<Question[]>{
        return await this.questionService.getQuestionsWithType(questionType);
    }

    @Post()
    createQuestion(@Body() questionDto : CreateQuestionDto){
        return this.questionService.createQuestion(questionDto);
    }

    @Patch(':id')
    patchQuestion(@Param('id') questionId : number, @Body() questionDto : UpdateQuestionDto){
        return this.questionService.patchQuestion(questionId, questionDto);
    }
}
