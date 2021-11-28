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
    </>
  );
}

export { EmailAutocomplete };
