# Cloud Gym Management System 
gym for database course

ERM Online Drawing Tool: https://www.lucidchart.com/

For GYM Facilities: http://www.leehayward.com/gym_equipment/

## Gym description

The Cloud Gym Management System is aimed to provide the modern informatized fitness center supported by the convenient and flexible management system. The entity, relationship and constraints are described in ER-graph. As an example, the manager entity has ID, Expiration Date attributes and the coach entity has ID, expiration time, level and calendar attributes. There is an MANAGER relationship between them and the constraint is that one coach should be managed by exactly one manager. The data we plan to use is the virtual data rather than real world data. By deploying this system, manager would benefit from the real-time management on equipment, membership of fitness center. Member and fitness coach can arrange a time slot for their fitness training plan. Member can register course or reserve an equipment. Moreover, manager can supervise and address the problem of frastructure if one problem happened for a specific equipment. 

### Entity and analysis:
- Manager: ID, Expiration Date
- Coach: ID, expiration time, level
- Member:ID, level, expiration data
- Maintainer:  ID, expiration time
- Equipment: Brand, Status, ID, Category
- Person (from logic layer, Manager, Coach, Member and Maintainer is a person): ID, Name, Age, Gender

### Relationship
- (Member, Manager, Coach, Maintainer) ISA Person
- Maintainer MAINTAINS Equipment ( this table will have MaintainerID, EquipmentID)
- Manager MANAGER Coach, Maintainer ( this table will have ManagerID and XXXID)
- Member RESERVE Coach （this table will have MemberID, CoachID, Timeslot）
- Manager SERVER Member (this table will have ManagerID and MemberID)

-Since there is no obligable limitation for member to use facilities, we should not have a relationship between member and facilities.

### Limitations on Relationship
- one facility should be at least maintained by one maintainer
- a member could reserve at most one coach in a time slot
- a member could reserve facility that is reservable in a time slot
- a coach could organize at most one course in a time slot
- a hall could be reserved by at most one coach in a time slot
- Course and Open are weak entity
 (https://octodex.github.com/images/yaktocat.png)
