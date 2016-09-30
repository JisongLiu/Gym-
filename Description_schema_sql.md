# ER Diagram to SQL

## Person

```sql
CREATE TABLE Person(
    Pid text primary key,
    Age int,
    Name text,
    Gender text
);
```

## Manager

```sql
CREATE TABLE Manager(
    Pid int references Person,
    Ex_date int
);
```
