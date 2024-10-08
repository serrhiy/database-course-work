# Модель прецедентів

## 1. Діаграма прецедентів

@startuml
actor "Користувач" as user
actor "Адміністратор" as admin

usecase "<b>Create Category</b>\nСтворити категорію ресурсу" as UC_1
usecase "<b>Analyze Sentiment</b>\nПроаналізувати ресурси для отримання тональності контенту" as UC_2
usecase "<b>Add Resource</b>\nДодати ресурс для аналізу даних" as UC_3
usecase "<b>Update Resource</b>\nЗмінити відомості про ресурс аналізу даних" as UC_4
usecase "<b>Delete Resource</b>\nВидалити ресурс аналізу даних" as UC_5
usecase "<b>Get Data</b>\nОтримати проаналізовану інформацію" as UC_6

user -u-> UC_2
user -u-> UC_6
admin -u-|> user

admin -u-> UC_1
admin -u-> UC_3
admin -u-> UC_4
admin -u-> UC_5
@enduml

## 2. Специфікації

### 1. Специфікація CreateCategory

| **_ID:_**                | CreateCategory                                                                                                                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Створити категорію ресурсів.                                                                                                                                                                                                                        |
| **_УЧАСНИКИ:_**          | Адміністратор, Система.                                                                                                                                                                                                                             |
| **_ПЕРЕДУМОВИ:_**        | Немає.                                                                                                                                                                                                                                              |
| **_РЕЗУЛЬТАТ:_**         | Створена категорія ресурсів.                                                                                                                                                                                                                        |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | Ex.001 Невалідні дані.                                                                                                                                                                                                                              |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор надає системі дані, необхідні для створення категорії. <br/> 2. Система перевіряє валідність наведених даних та зберігає категорію (можлива EX.001). <br/> 3. Система повідомляє адміністратору про успішність виконання операції. |

@startuml
|Адміністратор|
start
: Адміністратор натискає кнопку "Створити категорію ресурсів";
: Адміністратор передає необхідні дані;
: Користувач натискає кнопку "Створити";

|Система|
: Система отримує запит на створення категорії ресурсу;
: Система перевіряє отримані дані;
note right #red
<b>Можлива виключна ситуація</b>
<b>Ex.001 Невалідні дані.</b>
end note
: Система створює категорію ресурсу;
: Система повідомляє про успішне виконання операції;
|Адміністратор|
stop
@enduml

### 2. Специфікація CreateCategory

| **_ID:_**                | AnalyzeSentiment                                                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Проаналізувати ресурси для отримання тональності контенту.                                                                                                                                              |
| **_УЧАСНИКИ:_**          | Користувач, Система.                                                                                                                                                                                    |
| **_ПЕРЕДУМОВИ:_**        | Існування хоча б одного ресурсу.                                                                                                                                                                        |
| **_РЕЗУЛЬТАТ:_**         | Тональність контенту.                                                                                                                                                                                   |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | Ex.001 Невалідні дані.                                                                                                                                                                                  |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор надає системі дані, необхідні для аналізу. <br/> 2. Система перевіряє валідність наведених даних та аналізує ресурси (можлива EX.001). <br/> 3. Система надає результат користувачеві. |

@startuml
|Користувач|
start
: Користувач натискає кнопку "Отримати тональність контенту";
: Користувач надає дані, що ідентифікують ресурси, тональність яких потрібно отримати;
: Користувач натискає кнопку "Отримати тональність";

|Система|
: Система отримує запит на отримання тональності контенту;
: Система перевіряє отримані дані;
note right #red
<b>Можлива виключна ситуація</b>
<b>Ex.001 Невалідні дані.</b>
end note
: Система аналізує ресурс(-и);
: Система повідомляє про успішне виконання операції і надає користувачеві проаналізовані дані;
|Користувач|
stop
@enduml

### 3. Специфікація AddResource

| **_ID:_**                | AddResource                                                                                                                                                                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Додати ресурс для аналізу даних.                                                                                                                                                                                                                                     |
| **_УЧАСНИКИ:_**          | Адміністратор, Система.                                                                                                                                                                                                                                              |
| **_ПЕРЕДУМОВИ:_**        | Немає.                                                                                                                                                                                                                                                               |
| **_РЕЗУЛЬТАТ:_**         | Новий ресурc аналізу даних.                                                                                                                                                                                                                                          |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | EX.001 Ресурс недоступний.                                                                                                                                                                                                                                           |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор надає системі дані, за якими вона може отримати інформацію. <br/> 2. Система перевіряє валідність наведених даних (можлива EX.001). <br/> 3. Система зберігає ресурс. <br/> 4. Система повідомляє адміністратору про успішність виконання операції. |

@startuml
|Адміністратор|
start
: Адміністратор натискає кнопку "Додати ресурс";
: Адміністратор надає необхідні дані;
: Адміністратор натискає кнопку "Додати";

|Система|
: Система отримує запит на додавання ресурсу;
: Система перевіряє отримані дані;
note right #red
<b>Можлива виключна ситуація</b>
<b>Ex.001 Ресурс недоступний.</b>
end note
: Система додає ресурс;
: Система повідомляє про успішне виконання операції;
|Адміністратор|
stop
@enduml

### 4. Специфікація UpdateResource

| **_ID:_**                | UpdateResource                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Змінити відомості про ресурс аналізу даних.                                                                                                                                                                                                                                                                                                                                                          |
| **_УЧАСНИКИ:_**          | Адміністратор, Система.                                                                                                                                                                                                                                                                                                                                                                              |
| **_ПЕРЕДУМОВИ:_**        | Існування ресурсу аналізу даних.                                                                                                                                                                                                                                                                                                                                                                     |
| **_РЕЗУЛЬТАТ:_**         | Змінений ресурc аналізу даних.                                                                                                                                                                                                                                                                                                                                                                       |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | EX.001 Ресурс недоступний. <br/> EX.002 Ресурс відсутній в системі.                                                                                                                                                                                                                                                                                                                                  |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор надає системі дані, за якими вона може ідентифікувати ресурс. <br/> 2. Система перевіряє валідність наведених даних та ідентифікує ресурс (можлива EX.001 та EX.002). <br/> 3. Адміністратор надає дані, на які потрібно замінити ресурс. <br/> 4. Система змінює ресурс відповідно до доданих даних. <br/> 5. Система повідомляє адміністратору про успішність виконання операції. |

@startuml
|Адміністратор|
start
: Адміністратор натискає кнопку "Змінити відомості про ресурс";
: Адміністратор надає необхідні дані, що однозначно ідентифікують ресурс;
: Адміністратор натискає кнопку "Змінити";

|Система|
: Система отримує запит на зміну відомостей про ресурс;
: Система перевіряє отримані дані і обирає ресурс;
note right #red
<b>Можлива виключна ситуація</b>
<b>EX.002 Ресурс не існує.</b>
end note
: Система надає адміністратору форму для заповнення нових відомостей;

|Адміністратор|
: Адміністратор заповнює форму з новими відомостями;
: Адміністратор натискає кнопку "Зберегти";

|Система|
: Система перевіряє отримані дані;
note right #red
<b>Можлива виключна ситуація</b>
<b>EX.001 Ресурс недоступний.</b>
end note
: Система зберігає ресурс;
: Система повідомляє про успішне виконання операції;
|Адміністратор|
stop
@enduml

### 5. Специфікація DeleteResource

| **_ID:_**                | DeleteResource                                                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Видалити ресурс аналізу даних.                                                                                                                                                                                                                                            |
| **_УЧАСНИКИ:_**          | Адміністратор, Система.                                                                                                                                                                                                                                                   |
| **_ПЕРЕДУМОВИ:_**        | Відсутність існування ресурсу аналізу даних.                                                                                                                                                                                                                              |
| **_РЕЗУЛЬТАТ:_**         | Новий ресурс аналізу даних.                                                                                                                                                                                                                                               |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | EX.001 Ресурс відсутній в системі.                                                                                                                                                                                                                                        |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор надає системі дані, за якими вона може отримати інформацію. <br/> 2. Система перевіряє наявність ресурсу (можлива EX.001). <br/> 3. Система видаляє інформацію про ресурс. <br/> 4. Система повідомляє адміністратору про успішність виконання операції. |

@startuml
|Адміністратор|
start
: Адміністратор натискає кнопку "Видалити ресурс";
: Адміністратор надає необхідні дані, що однозначно ідентифікують ресурс;
: Адміністратор натискає кнопку "Видалити";

|Система|
: Система отримує запит на видалення ресурсу;
: Система перевіряє отримані дані;
note right #red
<b>Можлива виключна ситуація</b>
<b>EX.001 Ресурс відсутній в системі.</b>
end note
: Система робить повторний запит до адміністратора на видалення ресурсу;

|Адміністратор|
: Адміністратор натискає кнопку "Видалити";

|Система|
: Система видаляє ресурс;
: Система повідомляє про успішне виконання операції;
|Адміністратор|
stop
@enduml

### 6. Специфікація GetData

| **_ID:_**                | GetData                                                                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **_НАЗВА:_**             | Отримати проаналізовану інформацію.                                                                                               |
| **_УЧАСНИКИ:_**          | Користувач, Система.                                                                                                              |
| **_ПЕРЕДУМОВИ:_**        | Наявність хоча б одного ресурсу аналізу даних.                                                                                    |
| **_РЕЗУЛЬТАТ:_**         | Проаналізована інформація.                                                                                                        |
| **_ВИКЛЮЧНІ СИТУАЦІЇ:_** | EX.001 Невалідні дані.                                                                                                            |
| **_ОСНОВНИЙ СЦЕНАРІЙ:_** | 1. Адміністратор робить запит на отримання даних. <br/> 2. Система аналізує дані. <br/> 3. Система надає результат користувачеві. |

@startuml
|Користувач|
start
: Користувач натискає кнопку "Отримати проаналізовані дані";
: Користувач надає дані про ресурси, які потрібно використовувати під час аналізу;
: Користувач натискає кнопку "Отримати дані";

|Система|
: Система отримує запит на отримання проаналізованих даних;
: Система перевіряє отримані дані від користувача;
note right #red
<b>Можлива виключна ситуація</b>
<b>Ex.001 Невалідні дані.</b>
end note
: Система аналізує ресурс(-и);
: Система повідомляє про успішне виконання операції і надає користувачеві проаналізовані дані;
|Користувач|
stop
@enduml
