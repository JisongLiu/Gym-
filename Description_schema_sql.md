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
    Ex_date DATE,
    Age int,
    Name text,
    Gender text,
    Calendar timestamp[2][20],
    Level int,
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
);
```
## Equipment
```sql
CREATE TABLE Equipment(
    EID text PRIMARY KEY,
    Brand text,
    Status text,
    Catagory text,
    Calendar timestamp[2][20]
);
```
## hall
```sql
CREATE TABLE Equipment(
    Loacatin text,
    Name text PRIMARY KEY,
    Capacity int
);
```
## relationship table manager-equipment
```sql
CREATE TABLE Maintain(
    JobID int  PRIMARY KEY,
    Expr_Date timestamp,
    EID text UNIQUE REFERENCES Equipment,
    Manid text REFERENCES Manager
);
```


## relationship table member-equipment
```sql
CREATE TABLE memberEquipment(
    Reservation timestamps,
    Pid NOT NULL text,
    Eid text,
    FOREIGN KEY(Pid) REFERENCES Member,
    FOREIGN KEY(Eid) REFERENCES Equipment,
    PRIMARY KEY(Reseration,Eid)
);
```
## relationship table member-coach
```sql
CREATE TABLE train(
    TimeSlot timestamp,
    Coaid text NOT NULL,
    Pid text NOT NULL,
    FOREIGN KEY(Pid) REFERENCES Member,
    FOREIGN KEY(Coaid) REFERENCES Coach,
    PRIMARY KEY(TimeSlot,Coaid)
);
```
## relationship table member-coach-hall
```sql
CREATE TABLE instruction(
    TimeSlot timestamp,
    Coaid text,
    Cid text,
    Name text,
    FOREIGN KEY(Cid) REFERENCES Course,
    FOREIGN KEY(Coaid) REFERENCES Coach,
    FOREIGN KEY(Name) REFERENCES Hall,
    PRIMARY KEY(TimeSlot,Name),
    UNIQUE(Cid),
    UNIQUE(Cid, TimeSlot)
);
```
