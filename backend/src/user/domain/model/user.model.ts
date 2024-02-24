import { Model } from '@/common/domain/model/model';

export type FriendList = Omit<User, 'friendList'>;

export enum UserStatusEnum {
  OFFLINE,
  ONLINE,
  INVISIBLE,
  AFK,
  IN_GAME,
}

export type UserProps = {
  id?: string;
  username: string;
  nickname?: string;
  email: string;
  status?: UserStatusEnum;
};

export class User extends Model<UserProps> {
  protected props = {} as UserProps;

  constructor({ username, nickname, email, status }: UserProps, id?: string) {
    super(id);
    this.props.username = username;
    this.props.nickname = nickname;
    this.props.email = email;
    this.props.status = status || UserStatusEnum.OFFLINE;
  }

  getusername(): string {
    return this.props.username;
  }

  getNickname(): string {
    return this.props.nickname;
  }

  getEmail(): string {
    return this.props.email;
  }

  getStatus(): UserStatusEnum {
    return this.props.status;
  }
}
