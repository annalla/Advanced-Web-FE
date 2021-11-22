import {sendInvitaionByMail} from "../apis/class.api"
export const sendMail = (code, emailList,isTeacher) => {
    var result=false;
    const requestInvite = {
        classroomId: code,
        teacherEmailArray: isTeacher ? emailList : [],
        studentEmailArray: isTeacher ? [] : emailList,
      };
    sendInvitaionByMail(requestInvite)
    .then((res)=>{
        if(res.status===1){
            console.log("true")
            result=true;
        }else{
            result=false;
            console.log("false")
        }
    })
    return result;
};
  