# my-msa

how to start

1. docker-compose builder --no-cache
2. docker-compose up -d

DB initialize
curl --location --request POST 'http://localhost:3000/init'

gateway_url = http://localhost:3000
auth_url = http://localhost:3001
event_url = http://localhost:3002

## User
서비스의 기본 사용자 정보를 저장하는 테이블, 권한, 이름, email, password
## Event
이벤트에 대한 정보를 저장하는 테이블, Event Type으로 출석(attendance), 추천(Referral), 특수(Special), 쿠폰(Coupon) 타입으로 별도의 Event Condition을 가지고 이벤트 생성 가능
## Reward
보상정보 테이블, 열린 Event에 대한 보상정보를 기록하는 테이블
## EventProgress
Event와 Reward에 맞추어 달성 정도를 기록하는 테이블, 별도 출석, 추천, 특수, 쿠폰에 대한 리소스를 만들지 않고 대상 유저에 대한 이벤트 달성 정도를 기록하는 테이블, 업데이트 시마다 progress가 업데이트 되어 달성정도가 기록됨.
## RewardReqeust
보상을 요청하는 테이블, 수령완료여부 및 요청 기록 테이블
