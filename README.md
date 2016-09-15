# Gym
gym for database course

ERM Online Drawing Tool: https://www.lucidchart.com/

## Gym description

### Person Structure
- Manager
- Member
- Maintainer
- Coach

### Item Structure
- Weight
- Running machine

The description displayed above will be all roles in the GYM

## Person/Facilities description
### Facilities
- Category
- Number
- Expriation date
- Status
- Name
- Brand

### Person

#### Coach
- level
- Status
- Name
- Num
- Gender
- Age

#### Member
- level
- expiration time
- Name
- Id
- Gender
- Age

#### Manager
- Num
- Status
- Name
- Age

#### Maintainer
- Num
- Status
- Name
- Age

### Relationship
- Manager (servce) Member
- Manager  (manager) Coach
- Coach (train) Member  train should have an attribute, time slot
- Maintainer (Maintain) Facilities
-Since there is no obligable limitation for member to use facilities, we should not have a relationship between member and facilities.
