import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  // resource — приватное свойство класса. Добавляем его к базовому URL, чтобы получить
  // финальный URL, на который нужно отправлять запросы
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  // запрос на получение списка сущностей
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  // запрос на получение одной сущности по id
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

// Наследуемся от Read-only API-сервиса и добавляем операции post, put, delete
export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  // запрос на создание сущности
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  // запрос на обновление сущности
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  // запрос на удаление сущности
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

// наследуемся от BaseApiService, так как класс не подразумевает CRUD операции
export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    // передаём notifier для использования в родительском конструкторе
    super(notifier);
  }

  // задаём токен авторизации
  setAuthHeader() {
    // получаем токен из LocalStorage с помощью JWT-сервиса
    const token = JwtService.getToken();
    // добавляем заголовок авторизации в axios как Bearer token
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    // отправляем логин/пароль для авторизации на сервере
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    // делаем логаут на сервере
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    this.setAuthHeader();
    // получаем профиль залогиненного пользователя
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

// Наследуемся от CRUD API-сервиса
export class OrdersApiService extends CrudApiService {
  constructor(notifier) {
    super("orders", notifier);
  }

  // Форматирование данных перед отправкой на сервер (убираем лишнее)
  _createRequest(order) {
    const { ...request } = order;
    return request;
  }

  // Получение списка заказов
  async query(config = {}) {
    const orders = await super.query(config);
    return orders;
  }

  // Получение 1 заказа по id
  async get(id, config = {}) {
    const { data } = await axios.get(`orders/${id}`, config);
    return data;
  }

  // Создание нового заказа
  async post(order) {
    const { data: newOrder } = await axios.post(
      "orders",
      this._createRequest(order)
    );
    return newOrder;
  }

  // Обновление 1 заказа
  async put(order) {
    await axios.put(`tasks/${order.id}`, this._createRequest(order));
    return order;
  }
}
