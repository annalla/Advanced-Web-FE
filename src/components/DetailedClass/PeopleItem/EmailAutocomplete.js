// import * as React from 'react';
// import { ReactMultiEmail, isEmail } from 'react-multi-email';
// import 'react-multi-email/style.css';

// class EmailAutocomplete extends React.Component{
//   state = {
//     emails: [],
//   };

//   render() {
//     const { emails } = this.state;
//     return (
//       <>
//         <h3>Email</h3>
//         <ReactMultiEmail
//           placeholder="placeholder"
//           emails={emails}
//           onChange={(_emails) => {
//             this.setState({ emails: _emails });
//           }}
//           validateEmail={email => {
//             return isEmail(email); // return boolean
//           }}
//           getLabel={(
//             email,
//             index,
//             removeEmail,
//           ) => {
//             return (
//               <div data-tag key={index}>
//                 {email}
//                 <span data-tag-handle onClick={() => removeEmail(index)}>
//                   ×
//                 </span>
//               </div>
//             );
//           }}
//         />
//         <br />
//         <h4>react-multi-email value</h4>
//         <p>{emails.join(', ') || 'empty'}</p>
//       </>
//     );
//   }
// }

// export {EmailAutocomplete};
import * as React from "react";
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";


function EmailAutocomplete({ control}) {
  const [emails, setEmails] = React.useState([]);
 
  return (
    <>
      <ReactMultiEmail
        placeholder="Type email here"
        emails={emails}
        onChange={(_emails) => {
          setEmails(_emails);
          control(_emails);
        }}
        validateEmail={(email) => {
          return isEmail(email); // return boolean
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              {email}
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
      <br />
      {/* <h4>react-multi-email value</h4>
      <p>{emails}</p> */}
    </>
  );
}

export { EmailAutocomplete };
