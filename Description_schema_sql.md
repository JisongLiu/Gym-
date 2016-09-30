# ER Diagram to SQL

## Manager

```sql
CREATE TABLE Manager(
    Manid text primary key,
    Ex_date DATE,
    Age int,
    Name text,
    Gender text
);
```

## Coach
```sql
CREATE TABLE Coach(
    Coaid text primary key,
    Ex_date DATE,
    Age int,
    Name text,
    Gender text,
    Calendar ARRAY [2] [20],
    Level int
);
```
## Course
```sql
CREATE TABLE Course(
    Name text,
    Description text,
    Tag text,
    PRIMARY KEY(Name)
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
## Equipment
```sql
CREATE TABLE Equipment(
    ID text,
    Brand text,
    Status text,
    Catagory text,
    Calendar,
    PRIMARY KEY(ID)
);
```
