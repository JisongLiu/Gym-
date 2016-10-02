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
    Level int
);
```
## Member
```sql
CREATE TABLE Member(
    Level int,
    Times int,
    ExpirationData data,
    Pid text PRIMARY KEY,
    Age int,
    Name text,
    Gender text
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
    FOREIGN KEY(EID) REFERENCES Equipment,
    FOREIGN KEY(Manid) REFERENCES Manager
);
```
## relationship table manager-member
```sql
CREATE TABLE Manager_member(
    FOREIGN KEY(Manid) REFERENCES Manager,
    FOREIGN KEY(Pid) REFERENCES Member,
    Primary KEY(Pid)
);
```
## relationship table manager-coach
```sql
CREATE TABLE Manager_coach(
    FOREIGN KEY(Manid) REFERENCES Manager,
    FOREIGN KEY(Coaid) REFERENCES Coach,
    Primary KEY(Coaid)
);
```
## relationship table member-equipment
```sql
CREATE TABLE memberEquipment(
    Reservation timestamps,
    Pid text,
    Eid text,
    FORMARY KEY(Pid) REFERENCES Member,
    FORMARY KEY(Eid) REFERENCES Equipment,
    PRIMARY KEY(Reseration,Eid)
);
```
## relationship table member-coach
```sql
CREATE TABLE train(
    TimeSlot timestamps,
    Coaid text,
    Pid text,
    FORMARY KEY(Pid) REFERENCES Member,
    FORMARY KEY(Coaid) REFERENCES Coach,
    PRIMARY KEY(TimeSlot,Coaid)
);
```
## relationship table member-coach-hall
```sql
CREATE TABLE train(
    TimeSlot timestamps,
    Coaid text,
    Cid text,
    Name text,
    FORMARY KEY(Cid) REFERENCES Course,
    FORMARY KEY(Coaid) REFERENCES Coach,
    FORMARY KEY(Name) REFERENCES Hall,
    PRIMARY KEY(timestampes,Name)
);
```
