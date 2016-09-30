# ER Diagram to SQL

## Manager

```sql
CREATE TABLE Manager(
    Manid text,
    Ex_date DATE,
    Age int,
    Name text,
    Gender text,
    primary key(Manid)
);
```

## Coach
```sql
CREATE TABLE Coach(
    Coaid text,
    Ex_date DATE,
    Age int,
    Name text,
    Gender text,
    Calendar timestamp[2][20],
    Level int,
    PRIMARY KEY(Coaid)
);
```
## Member
```sql
CREATE TABLE Member(
    Level int,
    Times int,
    ExpirationData data,
    Pid text,
    Age int,
    Name text,
    Gender text
    PRIMARY KEY(Pid)
);
```
## Course
```sql
CREATE TABLE Course(
    CID text,
    Name text,
    Description text,
    Tag text,
    PRIMARY KEY(CID)
);
```
## Equipment
```sql
CREATE TABLE Equipment(
    EID text,
    Brand text,
    Status text,
    Catagory text,
    Calendar timestamp[2][20];
    PRIMARY KEY(EID)
);
```
## hall
```sql
CREATE TABLE Equipment(
    Loacatin text,
    Name text,
    Capacity int,
    PRIMARY KEY(Name)
);
```
## relationship table manager-equipment
```sql
CREATE TABLE Maintain(
    JobID int,
    Expr_Date timestamp,
    Foreign KEY(EID),
    Foreign KEY(Manid)
    PRIMARY KEY(JobID)
);
```
## relationship table manager-member
```sql
CREATE TABLE Manager_member(
    Foreign KEY(Manid),
    Foreign KEY(Pid),
    Primary KEY(Pid)
);
```
## relationship table manager-coach
```sql
CREATE TABLE Manager_coach(
    Foreign KEY(Manid) REFERENCES Manager,
    Foreign KEY(Coaid),
    Primary KEY(Coaid)
);
```
## relationship table member-equipment
```sql
CREATE TABLE memberEquipment(
    Reservation timestamps,
    Name text,
    Capacity int,
    PRIMARY KEY(Name)
);
```
## relationship table member-coach
## relationship table member-coach-hall
