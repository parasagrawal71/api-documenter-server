const { HOST_URL } = require("../config");

module.exports.verifyEmailByOtpTemplate = (OTP) => {
  return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      html {
      }

      body {
      }

      tbody {
      }

      table.main-table {
        width: fit-content;
        border-collapse: separate;
        border-spacing: 40px 16px;
        margin: 50px auto;
        background-color: #f0f0f0;
        border-radius: 5px;
      }

      .otp {
        font-size: 24px;
        font-weight: bold;
        padding-left: 30px;
      }

      .verify-btn {
        background-color: #709cfd;
        padding: 10px 20px;
        outline: none;
        border: none;
        color: #ffffff !important;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
        cursor: pointer;
        text-decoration: none;
      }

      .textAlign {
        text-align: center;
      }

      .boldFont {
        font-weight: bold;
      }

      .otp {
        font-size: 24px;
      }
    </style>
  </head>
  <body>
    <table class="main-table">
      <tr>
        <td>To verify your account, please enter the following OTP</td>
      </tr>
      <tr>
        <td></td>
      </tr>
      <tr>
        <td class="textAlign boldFont otp">
          ${OTP}
        </td>
      </tr>
      <tr>
        <td>Thanks!</td>
      </tr>
    </table>
  </body>
</html>
`;
};
