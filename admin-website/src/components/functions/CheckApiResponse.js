import React from 'react';
import * as ReactDOM from 'react-dom/client';
import ErrorDisplay from '../ErrorDisplay';

export async function CheckApiResponse(apiResponse, message) {
  let respMessage = await message.then((result) => result.message);

  console.log(respMessage);
  const root = ReactDOM.createRoot(document.getElementById('errorDisplay'));

  switch (apiResponse.status) {
    case 200:
      root.render(<ErrorDisplay design="text-success" message="Success" />);
      localStorage.setItem('loggedIn', true);
      window.history.go(-1);
      /* .then(window.location.reload()) */

      break;
    case 400:
      if (respMessage == 'INVALID_CALL:|:USER_PHONE_ALREADY_IN_USE') {
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="Phone Already Registered Use Different One!"
          />
        );
      } else if (respMessage == 'INVALID_CALL:|:BRANCH_NAME_ALREADY_IN_USE') {
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="Branch Name Already Registered Use Different One!"
          />
        );
      } else if (respMessage == 'INVALID_CALL:|:INVALID_ID') {
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="Some Error Occured Go Back, Refresh The Page And Come Back Again!"
          />
        );
      } 
       else {
        root.render(
          <ErrorDisplay
            design="text-danger"
            message="You have incomplete credentials"
          />
        );
      }

      break;

    case 501:
      root.render(
        <ErrorDisplay
          design="text-danger"
          message="Sorry we're currently experiencing technical difficulties"
        />
      );
      break;
    default:
      break;
  }
}
