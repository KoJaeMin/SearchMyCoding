import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Question } from 'src/entities/questions.entity';
import { QuestionDto } from '../dto/Question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionService : QuestionsService){}

    @Get()
    getAllQuestions(){
        this.questionService.getAllQuestions()
    }

    @Get(':id')
    async getOneQuestion(@Param("id") questionId : number) : Promise<Question>{
        return await this.questionService.getOneQuestion(questionId);
    }

    @Post()
    createQuestion(@Body() questionDto : QuestionDto){
        return this.questionService.createQuestion(questionDto);
    }

    @Patch(':id')
    patchQuestion(@Param('id') questionId : number,@Body() questionDto : QuestionDto){
        return this.questionService.patchQuestion(questionId, questionDto);
    }
}
