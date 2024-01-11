export interface ISendGridMailGateway {
  sendRescueStudentEmail(data: { userName: string; userEmail: string; templateId: string }): Promise<boolean>;
  sendAdviceToChangePasswordEmail(data: { userEmail: string }): Promise<boolean>;
  sendPasswordChangedAdviceEmail(data: { userEmail: string }): Promise<boolean>;
  sendNewUserLeadEmail(user_email: string, userName: string, password: string): Promise<boolean>;
  sendOldUserLeadEmail(user_email: string, userName: string): Promise<boolean>;
  sendEmailWithRecoveryToken(token: string, user_email: string, userName: string): Promise<boolean>;
  sendNewUserAndNewSignatureEmail(user_email: string, user_name: string, password: string): Promise<boolean>;
  sendNewUserAndNewSignatureQbankOnboardingEmail(user_email: string): Promise<boolean>;
  sendUserNewSignatureEmail(user_email: string, userName: string): Promise<boolean>;
  sendUserCanceledSignatureEmail(user_email: string, userName: string): Promise<boolean>;
  sendUserCanceledSignatureByDelayedPaymentEmail(user_email: string, userName: string): Promise<boolean>;
  sendUserPasswordChangedNotification(user_email: string, userName: string): Promise<boolean>;
  adviceNewRankedTestsEmail(data: {
    userName: string;
    userEmail: string;
    testName: string;
    testIntervalDates: string;
    testRankingDate: string;
    moreTests: string;
  });
}
