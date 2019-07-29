# vk-api-test

[Demo](https://elikain.github.io/vk-api-test/)

Описание:

Веб-приложение с использованием ВКонтакте API. При первичном открытии в нем отображаются:
- заголовок
- две кнопки:
  - "Авторизоваться"
  - "Разлогиниться" (disabled)
  
По нажатию кнопки "Авторизоваться" всплывает pop-up окно, где происходит авторизация пользователя. После успешной авторизации и 
согласии на предоствление доступа к списку друзей, на странице самого приложения происходят следующие изменения:
- заголовок меняется на: "приветствие + имя авторизованного пользователя"
- под заголовком отображаются 5 случайных друзей из списка пользователя ВК
- кнопка "Авторизоваться" становиться неактивной, а кнопка "Разлогиниться", наоборот, активной.

При последующем посещении данного веб-приложения, пользователь запоминается и сразу отображаются: приветствие и 5 случайных друзей.

Авторизация осуществляется посредством Open API. Для инициализации Open API использован обычный(синхронный) способ.
