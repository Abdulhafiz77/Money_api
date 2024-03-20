export enum BaseStatusEnum {
   REGISTERED = 1,
   DELETED = 2,
   ACTIVE = 10,
   BLOCKED = 4,
   DISABLED = 0
}

export type COMPUTER_STATUS_TYPE = COMPUTER_STATUS_ENUM.BLOCKED | COMPUTER_STATUS_ENUM.CONNECTED_TO_AN_EMPLOYEE
| COMPUTER_STATUS_ENUM.CREATED | COMPUTER_STATUS_ENUM.DELETED;

export enum COMPUTER_STATUS_ENUM {
    CREATED = 1,
    CONNECTED_TO_AN_EMPLOYEE = 2,
    BLOCKED  = 3,
    DELETED  = 4
 }

 export const COMPUTER_STATUS = [
    {
        name: 'Создан',
        value: 1
    },
    {
        name: 'Подключень к сотруднику ',
        value: 2
    },
    {
        name: 'Блокировань',
        value: 3
    },
    {
        name: 'Удалён',
        value: 4
    }
 ]