import { QuestionType } from 'src/entities/questiontypes.entity';
import { QuestionTypesService } from './questiontypes.service';
import { QuestionTypeDto } from './../dto/QuestionType.dto';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('questiontypes')
export class QuestionTypesController {
    constructor(private readonly questionTypesService : QuestionTypesService){}

    @Get()
    getAllQuestionTypes(){
        this.questionTypesService.getAllQuestionTypes()
    }

    @Get(':id')
    async getOneQuestionType(@Param("id") questionId : number) : Promise<QuestionType>{
        return await this.questionTypesService.getOneQuestionType(questionId);
    }

    @Post('type')
    createQuestionType(@Body() questionTypeDto : QuestionTypeDto){
        return this.questionTypesService.createQuestionType(questionTypeDto);
    }

    @Patch(':id')
    patchQuestion(@Param('id') questionId : number,@Body() questionTypeDto : QuestionTypeDto){
        return this.questionTypesService.patchQuestionType(questionId, questionTypeDto);
    }
}
