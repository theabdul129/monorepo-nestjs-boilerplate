import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@packages/config';
import axios from 'axios';
import { BodyDto, HeaderDto, NotificationDto, RecipientDto, RecipientListDto } from './dtos/system-notification.dto';

@Injectable()
export class SystemNotificationService {
  readonly #logger = new Logger(SystemNotificationService.name);
  private externalSystemUrl: any;

  constructor(
  ) {
    const config = new ConfigService();
    this.externalSystemUrl = config.riyadh_bank_config;
  }

  async sendNotification() {
    console.log('send notifiaciton')
    this.#logger.log(`Sending Notification to customer`);
    
    try {
      //const headers = { Authorization: `Bearer ${adminToken}` };
      const headers = {};
      const url = `${this.externalSystemUrl.base}/corp/utilities/sendsystemnotification/v1.0`;
      console.log(url,'url');

      const notificationData = await this.createNotificationData();
      
      const resetHeaders = {
        ...headers,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(url, JSON.stringify(notificationData), { headers: resetHeaders });
      console.log(response,'response');
      if(response.status == HttpStatus.OK) {
        console.log(response,'response');
      }
  
      // return response; 
    } catch (err: any) {
      //throw new UnableToSignupException();
    }
  }

  // private async getAccessToken(): Promise<string> {
  //   const url = `${this.externalSystemUrl.base}/corp/utilities/oauth2.0/oauth2/token`;
  //   const data = new URLSearchParams();
  //   data.append('grant_type', 'client_credentials');
  //   data.append('client_id', this.adminClientId);
  //   data.append('client_secret', this.adminClientSecret);

  //   const response = await axios.post(url, data);
  //   return response.data.access_token;
  // }

  private async createNotificationData() {
    const notificationDto = new NotificationDto();

    const header = new HeaderDto();
    header.sender = "RIBLSAsadsdRI";
    header.receiver = "RIBLasdasdasSARI";
    header.timeStamp = "2023-09-12T09:30:06";

    const recipient = new RecipientDto();
    recipient.emailDestination = "string";
    recipient.ccEmailDestination = "string";
    recipient.language = "A";
    recipient.notificationMethod = "string";
    recipient.smsDestination = "string";

    const recipientList = new RecipientListDto();
    recipientList.recipient = recipient;

    const body = new BodyDto();
    body.templateType = "G";
    body.criticalFlag = "Y";
    body.acctNumber = "20333311639269901";
    body.adminType = "R";
    body.adminId = "string";
    body.iomssEventCd = "string";
    body.parameterList = ["string"];
    body.eventType = "string";
    body.recipientList = recipientList;
    body.atmCardNumber = "string";
    body.deptCd = "string";

    // Now assign the header and body to the main DTO
    notificationDto.header = header;
    notificationDto.body = body;

    return notificationDto;    
  }
}
