# nats

```
nats context add <ctx name> --select --description "context for"
nats context select local
```



```
nats s add <subject> --no-deny-purge --allow-rollup

nats s add CASEUPDATE --no-deny-purge --allow-rollup
caseupdate.>
```

```push consumer
nats consumer add CASEUPDATE COMPLETE --filter caseupdate.complete.*

                    Name: COMPLETE
               Pull Mode: true
          Filter Subject: caseupdate.complete
          Deliver Policy: Last
              Ack Policy: Explicit
                Ack Wait: 30.00s
           Replay Policy: Instant
      Maximum Deliveries: 5
         Max Ack Pending: 1,000
       Max Waiting Pulls: 512
```
```
nats consumer rm CASEUPDATE COMPLETE
[local] ? Really delete Consumer CASEUPDATE > COMPLETE Yes
[local] ? Delivery target (empty for Pull Consumers) completeprocessor
[local] ? Delivery Queue Group 
[local] ? Start policy (all, new, last, subject, 1h, msg sequence) all
[local] ? Acknowledgment policy explicit
[local] ? Filter Stream by subject (blank for all) caseupdate.complete
[local] ? Maximum Allowed Deliveries -1
[local] ? Maximum Acknowledgments Pending 0
[local] ? Idle Heartbeat 20
nats: error: invalid heartbeat duration: invalid duration
[local] ? Delivery target (empty for Pull Consumers) completeprocessor
[local] ? Delivery Queue Group 
[local] ? Start policy (all, new, last, subject, 1h, msg sequence) last
[local] ? Acknowledgment policy explicit
[local] ? Filter Stream by subject (blank for all) caseupdate.complete
[local] ? Maximum Allowed Deliveries -1
[local] ? Maximum Acknowledgments Pending 0
[local] ? Idle Heartbeat 20s
[local] ? Enable Flow Control, ie --flow-control Yes
[local] ? Deliver headers only without bodies No
[local] ? Add a Retry Backoff Policy Yes
[local] ? Backoff policy linear
[local] ? Minimum retry time 1m
[local] ? Maximum retry time 2m
[local] ? Number of steps to generate in the policy 2
Information for Consumer CASEUPDATE > COMPLETE created 2024-01-10T15:00:29+05:30

Configuration:

                    Name: COMPLETE
        Delivery Subject: completeprocessor
          Filter Subject: caseupdate.complete
          Deliver Policy: Last
              Ack Policy: Explicit
                Ack Wait: 1m0s
           Replay Policy: Instant
      Maximum Deliveries: 3
         Max Ack Pending: 1,000
          Idle Heartbeat: 20.00s
            Flow Control: true
                 Backoff: 1m0s, 1m30s

State:

  Last Delivered Message: Consumer sequence: 0 Stream sequence: 174
    Acknowledgment Floor: Consumer sequence: 0 Stream sequence: 0
        Outstanding Acks: 0 out of maximum 1,000
    Redelivered Messages: 0
    Unprocessed Messages: 1
         Active Interest: No interest

```




```
nats publish <subject> '{"caseid": 1234, "status": "success"}'

nats publish caseupdate.complete '{"caseid": 1234, "status": "success"}'

nats publish caseupdate.complete '{"caseid": 1234, "status": "success"}' --count=1000 --sleep 1s
```



```

```
