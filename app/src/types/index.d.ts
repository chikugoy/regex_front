declare interface IResponseData {
  data: any[];
  is_loading: boolean;
  is_error: boolean;
  error?: any;
  reload: any;
}

declare interface IRegex {
  id?: string;
  text: string;
  option_text: string;
  title: string;
  tags: string[];
  good_user_ids: string[];
  good_user_count: number;
  supplement: string;
  check_targets: ICheckTarget[];
  created_at?: string;
  updated_at?: string;
}

declare interface ICheckTarget {
  target: string;
  result?: ICheckResult;
}

declare interface ICheckResult {
  index: number;
  message: string;
  error_message: string;
  is_match: boolean;
  is_error: boolean;
}

declare interface ICommonModalProps {
  title: string,
  message: string,
  isOpenModal: boolean,
  isHiddenSubmit?: boolean,
  closeButtonText?: string,
  onClose: () => void,
  onSubmit?: () => void
}

declare interface IUser {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  accessToken?: string;
  refreshToken: string;
}