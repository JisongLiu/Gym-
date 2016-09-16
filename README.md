# Gym
gym for database course

ERM Online Drawing Tool: https://www.lucidchart.com/

For GYM Facilities: http://www.leehayward.com/gym_equipment/

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

#### User (Base)
- name
- Status
- ID
- Age
- Gender

#### Coach
- level
- Num
- ID

#### Member
- level
- expiration time
- ID

#### Manager
- Num
- ID

#### Maintainer
- Num
- ID

### Relationship
- Manager (servce) Member
- Manager  (manager) Coach & Maintainer
- Coach (train) Member  train should have an attribute, time slot
- Maintainer (Maintain) Facilities
-Since there is no obligable limitation for member to use facilities, we should not have a relationship between member and facilities.
