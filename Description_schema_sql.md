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
    Calendar
    Level int
);
```
