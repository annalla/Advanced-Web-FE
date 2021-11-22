import {sendInvitaionByMail} from "../apis/class.api"
export const sendMail = async (code, emailList,isTeacher) => {
    var result=false;
    const requestInvite = {
        classroomId: code,
        teacherEmailArray: isTeacher ? emailList : [],
        studentEmailArray: isTeacher ? [] : emailList,
      };
    await sendInvitaionByMail(requestInvite)
    .then((res)=>{
        console.log(res);
        if(res.status===1){
            result=true;
        }else{
            result=false;
        }
    })
    return result;
};
  