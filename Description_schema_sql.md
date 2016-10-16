# ER Diagram to SQL

## Manager

```sql
CREATE TABLE Manager(
    Manid text PRIMARY KEY,
    Ex_date DATE,
    Age int,
    Name text,
    Gender text
);
```

## Coach
```sql
CREATE TABLE Coach(
    Coaid text PRIMARY KEY,
    ex_date DATE,
    Age int,
    Name text,
    Gender text,
    Manid text NOT NULL references Manager
);
```
## Member
```sql
CREATE TABLE Member(
    Level int,
    Times int,
    Ex_date DATE,
    Pid text PRIMARY KEY,
    Age int,
    Name text,
    Gender text,
    Manid text NOT NULL references Manager
);
```
## Course
```sql
CREATE TABLE Course(
    CID text PRIMARY KEY,
    Name text,
    Description text,
    Tag text
    memlevel integer
);
```
## Equipment
```sql
CREATE TABLE Equipment(
    EID text PRIMARY KEY,
    Brand text,
    Status text,
    Catagory text
);
```
## hall
```sql
CREATE TABLE Hall(
    Loacatin text,
    Name text PRIMARY KEY,
    Capacity int
);
```
## relationship table Maintain
```sql
create table maintain
(eid text references equipment,
manid text references manager,
expr_date date,
jobid text primary key);
```


## relationship table borrow
```sql
CREATE TABLE borrow(
    time time,
    date date,
    Pid NOT NULL text references Member,
    Eid text  references equipment,
    PRIMARY KEY(eid, time date),
    CHECK ("time" > '09:00:00'::time AND "time" < '22:00:00'::time)
);
```
## relationship table Train
```sql
CREATE TABLE train(
    time time,
    date date,
    Coaid text NOT NULL refereneces coach,
    Pid text NOT NULL references memeber,
    PRIMARY KEY(Coaid, date, coaid),
    CHECK ("time" > '08:00:00'::time AND "time" < '18:00:00'::time)
);
```
## relationship table instruction
```sql
CREATE TABLE instruction(
    Coaid text REFERENCES Coach,
    Cid text REFERENCES Course,
    Name text NOT NULL REFERENCES Hall,
    timeslot text,
    PRIMARY KEY(Name),
    UNIQUE(Cid),
    UNIQUE(Cid, TimeSlot)
);
```
## relationship table Study
```sql
CREATE TABLE study(
    Cid text REFERENCES course,
    Pid text REFERENCES member,
    Ex_date date,
    Primary key(Cid,Pid)
);
```
