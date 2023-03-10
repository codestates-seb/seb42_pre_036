package com.errorit.erroritoverflow.app.answer.mapper;

import com.errorit.erroritoverflow.app.answer.dto.AnswerDto;
import com.errorit.erroritoverflow.app.answer.entity.Answer;
import com.errorit.erroritoverflow.app.comment.dto.CommentDto;
import com.errorit.erroritoverflow.app.comment.entity.Comment;
import com.errorit.erroritoverflow.app.common.pagenation.PageInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring" ,unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerDto.Post post);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch patch);

    // entity -> AnswerResponse
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    default AnswerDto.AnswerResponse answerToResponseDto(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        AnswerDto.AnswerResponse answerResponse = new AnswerDto.AnswerResponse();
        answerResponse.setOwnerName( answer.getMember().getName());
        answerResponse.setAnswerId( answer.getAnswerId());
        answerResponse.setQuestionId(answer.getQuestion().getQuestionId());
        // ownerId(작성자회원Id) 필드를 추가
        answerResponse.setOwnerId(answer.getMember().getMemberId());
        answerResponse.setCreatedAt( answer.getCreatedAt() );
        answerResponse.setModifiedAt( answer.getModifiedAt() );
        answerResponse.setContent( answer.getContent() );
        answerResponse.setComments(commentListToCommentResponseList(answer.getComments()));

        return answerResponse;
    };

    // entity -> MemberAnswerResponse
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    default AnswerDto.MemberAnswerResponse answerToMemberAnswerResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        AnswerDto.MemberAnswerResponse answerResponse = new AnswerDto.MemberAnswerResponse();
        answerResponse.setAnswerId( answer.getAnswerId() );
        answerResponse.setQuestionId( answer.getQuestion().getQuestionId());
        // ownerId(작성자회원Id) 필드를 추가
        answerResponse.setOwnerId(answer.getMember().getMemberId());
        answerResponse.setOwnerName( answer.getMember().getName());
        answerResponse.setCreatedAt( answer.getCreatedAt() );
        answerResponse.setModifiedAt( answer.getModifiedAt() );
        answerResponse.setContent( answer.getContent() );
        answerResponse.setComments(commentListToCommentResponseList(answer.getComments()));

        return answerResponse;
    };

    // List<Answer> -> List<AnswerResponse>
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    List<AnswerDto.AnswerResponse> answerListToResponseDtoList(List<Answer> answers);

    // List<Answer> -> List<MemberAnswerResponse>
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    List<AnswerDto.MemberAnswerResponse> answerListToMemberAnswerResponseList(List<Answer> answers);

    // Page<Answer> -> MemberAnswerListResponse
    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    default AnswerDto.MemberAnswerListResponse pageListToMemberAnswerListResponse(Page<Answer> answers){
        if ( answers == null ) {
            return null;
        }
        AnswerDto.MemberAnswerListResponse response = new AnswerDto.MemberAnswerListResponse();
        response.setPageInfo(PageInfo.of(answers));
        response.setAnswers(answerListToMemberAnswerResponseList(answers.getContent()));
        return response;
    }

    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    CommentDto.CommentResponse commentToCommentResponse(Comment comment);

    @Mapping(target = "ownerName", source = "member.name")
    @Mapping(target = "ownerId", source = "member.memberId")
    List<CommentDto.CommentResponse> commentListToCommentResponseList(List<Comment> comments);
}
