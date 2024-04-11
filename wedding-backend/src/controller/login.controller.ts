import { Body, Controller, Post } from '@nestjs/common';
import { stringToObject } from 'src/function';
import { decodeAES256 } from 'src/secret/AES256';
import { SetAES } from 'src/secret/AESKeySetting';
import { CompanyService } from 'src/service/company.service';

@Controller('login')
export class LoginController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/token')
  async getTokenLogin(@Body() body: { token: string }) {
    console.log(body.token);
    const aes256Setting = await SetAES.setting();
    try {
      const value: { id: string; key: string } = stringToObject(
        decodeAES256(body.token, aes256Setting),
      );
      const money = await this.companyService.getFindMoneyById(value.id);
      console.log(money);
      if (money != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (exp) {
      return false;
    }
  }
}
