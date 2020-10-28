/**
 * @file Z.js 
 * 
 * This script file belongs to the Z-Framework from Zierhut IT.
 * It is meant to be used with the framework together as it is build to parse special data generated by the framework. 
 * Using it outside the framework may result in broken behaviour.
 * 
 * It is not needed to include this file manually. It will be added to the website in layout essentials.
 * 
 * @author Adrian Urban
 * @author Alexander Zierhut
 */

/**
 * @type {object} Z
 * Namespace object for Z.js
 */
Z = {

  /**
   * Debug mode
   */
  debug: false,

  /**
   * Holds form actions
   */
  Forms: {
    /**
     * Creates a form object and returns it.
     * @param {*} options Options object
     * @param {boolean} options.doReload Should the form reload after submit? This is automatically set to true when using a CED in the form
     * @param {string} options.dom Id of a dom element to append this form automatically to
     * @param {saveHook} options.saveHook Function that is called after saving. It is only called after a success and not when validation errors occour
     * @param {formErrorHook} options.formErrorHook Function that gets called only on formErrors
     */
    create(options) { return new ZForm(options); },
  },

  /**
   * Holds everything related to communicating with the backend
   */
  Request: {
    /**
     * Triggers a subaction on the current action from which this view was launched
     * @param {string} action Name of the subaction. Can be checked in the backend with $req->isAction("blub")
     * @param {object} data Data to send to the client. It will be passed as post data
     * @param {function} handler Handler that gets called when the request was successfull
     */
    action(action, data, handler) {
      $.ajax({
        method: "POST",
        data: Object.assign(data, {action: action})
      }).done((data) => {
        var dat = null;
        try {
          dat = JSON.parse(data);
        } catch (e) {
          console.error("Please show this to a developer: ", data);
        }
        if (dat != null) {
          handler(dat);
        }
      });
    },
    /**
     * Triggers a subaction on any action of any controller. Simply put the path in as action. For example: "login/logout". URL parameters can be attached here too.
     * @param {string} action Name of the subaction. Can be checked in the backend with $req->isAction("blub")
     * @param {object} data Data to send to the client. It will be passed as post data
     * @param {function} handler Handler that gets called when the request was successful
     */
    root(action, subaction, data, handler = null, async = true, parse = true) {
      $.ajax({
        method: "POST",
        data: Object.assign(data, {action: subaction}),
        url: Z.Request.rootPath + action,
        async: async
      }).done((data) => {
        if(parse) {
          var dat = null;
          try {
            dat = JSON.parse(data);
          } catch (e) {
            console.error("Please show this to a developer: ", data);
          }
          if (dat != null && handler) {
            data = dat;
          }
        }
        handler(data);
      });
    },
    /**
     * Path to the root of the page. This is set in the layout essentials. Do not change it!
     */
    rootPath: ""
  },
  /**
   * List of lang attributes for user feedback. These can be overwritten in the layout after embeding the layout essentials.
   */
  Lang: {
    addElement: '<i class="fas fa-plus"></i>',
    submit: "Submit",
    saved: "Saved!",
    saveError: "Error while saving",
    unsaved: "There are unsaved changes",
    error_filter: "Your input does not have the correct pattern!",
    error_length: "Your input is too long or too short. It should have between [0] and [1] characters.",
    error_required: "Please fill in this field",
    error_range: "The number is too large to too small. It must be between [0] and [1].",
    error_unique: "This already exists!",
    error_exist: "This does not exist!",
    error_integer: "This is not an integer!",
    error_date: "Please give a correct date!",
    //TODO: Add custom errors and translating
    error_regex: "The input does not meet the required pattern!",
    error_contact_admin: "This input field does not like you. Contact an admin that convinces it that you are a good person!",
    choose_file: "Choose file"
  },
  /**
   * Holds some presets to create fix effects
   */
  Presets: {
    /**
     * Login preset. Can be used to create a user login. Call it on every try for example on tge submit button press
     * @param {string} nameElementId ID of the dom element for the name/email input
     * @param {string} passwordElementId ID of the dom element for password input
     * @param {string} errorLabel ID of the dom element to show errors in
     * @param {string} redirect URL to redirect after a successful login
     */
    Login(nameElementId, passwordElementId, errorLabel, redirect = "") {
      var eName = document.getElementById(nameElementId);
      var ePassword = document.getElementById(passwordElementId);
      Z.Request.root('login', 'login', {name: eName.value, password: ePassword.value}, (res) => {  
        if (res.result == "success") {
          if (redirect == "") {
            window.location.reload();
          } else {
            window.location.href = redirect;
          }
        } else {
          if(document.getElementById(errorLabel).innerHTML == res.message) {
            $('#'+errorLabel).fadeOut(20).fadeIn(100).fadeOut(20).fadeIn(100).show();
          } else {
            document.getElementById(errorLabel).innerHTML = res.message;
            $('#'+errorLabel).slideDown(300);
          }
        }
      });
    },
    /**
     * Login preset. Can be used to create a user login. Call it on every try for example on tge submit button press
     * @param {string} unameemailElementId ID of the dom element for the name/email input
     * @param {string} errorLabel ID of the dom element to show errors in
     * @param {string} redirect URL to redirect after a successful login
     */
    ForgotPassword(unameemailElementId, errorLabel, redirect = "") {
      var eUnameemail = document.getElementById(unameemailElementId);
      Z.Request.root('login/forgot_password', 'forgot_password', {unameemail: eUnameemail.value}, (res) => {  
        if (res.result == "success") {
          if (redirect == "") {
            window.location.reload();
          } else {
            window.location.href = redirect;
          }
        } else {
          if(document.getElementById(errorLabel).innerHTML == res.message) {
            $('#'+errorLabel).fadeOut(20).fadeIn(100).fadeOut(20).fadeIn(100).show();
          } else {
            document.getElementById(errorLabel).innerHTML = res.message;
            $('#'+errorLabel).slideDown(300);
          }
        }
      });
    },
    /**
     * Signup Preset. Call it on every try for example on tge submit button press
     * @param {string} nameElementId ID of the DOM input for the name/mail
     * @param {string} passwordElementId ID of the DOM input for the password
     * @param {string} passwordConfirmElementId ID of the DOM input for repeating the password
     * @param {string} errorLabelId ID if the DOM elemnt to show errors in
     * @param {string} redirect URL to redirect to after a successfull signup
     */
    Signup(nameElementId, passwordElementId, passwordConfirmElementId, errorLabelId, redirect = "", alertErrors = false) {
      var eName = document.getElementById(nameElementId);
      var ePassword = document.getElementById(passwordElementId);
      var ePasswordConfirm = document.getElementById(passwordConfirmElementId);
      if (ePassword.value != ePasswordConfirm.value) { 
        if(alertErrors) {
          alert("The password are not the same!"); 
          return; 
        } else {
          if(document.getElementById(errorLabel).innerHTML == "The password are not the same!") {
            $('#'+errorLabelId).fadeOut(20).fadeIn(100).fadeOut(20).fadeIn(100).show();
          } else {
            document.getElementById(errorLabel).innerHTML = "The password are not the same!";
            $('#'+errorLabelId).slideDown(300);
          }
          return;
        }
      }
      Z.Request.root('login/signup', 'signup', {email: eName.value, password: ePassword.value}, (res) => {
        if (res.result == "error") {
          document.getElementById(errorLabelId).innerHTML = res.message;
          if(alertErrors) alert(res.message);
        } else if (res.result == "success") {
          if (redirect == "") {
            window.location.reload();
          } else {
            window.location.href = redirect;
          }
        }
      });
    }
  }
}

/**
 * @type {Number} Number that holds the latest created index. Used to give ids to input fields and map label correctly to them.
 */
var zInputIndex = 0;

/**
 * InvalidError is an error that holds data about field failed to validate and mark them. This object usally comes as literal from the backend.
 * @typedef {object} InvalidError
 * @property {string} type The type of the error. This specifies what message to show
 * @property {string[]} info Array of strings that will be inserted in the placeholders ([0], [1]...)
 */

/**
 * Blueprint used in the constructor of CED fields and CED items.
 * @typedef {object} CEDBlueprint
 * @property {string} name Name of the field for post data
 * @property {string} text Text for the label
 * @property {array} value Default value. Can be generated in php with createCEDFood
 * @property {Array} fields Array of options for creating fields. These fields will be inserted in all CED items
 * @property {boolean} compact Uses the compact mode if set to true
 */

/**
 * Class that handles CED items
 */
class ZCED { //Create, edit, delete

  /**
   * Creates a ZCED instance
   * @param {CEDBlueprint} blueprint Options object for the CED
   * @param {string} blueprint.name Name of the field for post data
   * @param {string} blueprint.text Text for the label
   * @param {array} blueprint.value Default value. Can be generated in php with createCEDFood
   * @param {Array} blueprint.fields Array of options for creating fields. These fields will be inserted in all CED items
   * @param {boolean} blueprint.compact Uses the compact mode if set to true
   */
  constructor(blueprint = {}) {
    this.blueprint = blueprint;
    this.type = "CED";

    this.name = blueprint.name;
    this.items = [];
    this.deleted = [];
    this.zform = null;
    this.blueprint = blueprint;

    this.width = 12;

    this.dom = document.createElement("div");
    this.dom.classList.add("col", "col-12");

    var label = document.createElement("label");
    label.innerHTML = blueprint.text;
    this.dom.appendChild(label);

    this.itemDom = document.createElement("div");
    this.itemDom.classList.add("bg-secondary", "pt-1", "pb-1");
    this.dom.appendChild(this.itemDom);

    this.listeners = {};

    this.buttonAdd = document.createElement("button");
    this.buttonAdd.innerHTML = Z.Lang.addElement;
    this.buttonAdd.addEventListener("click", this.createItem.bind(this));
    this.buttonAdd.classList.add("btn", "btn-primary", "m-1");
    this.dom.appendChild(this.buttonAdd);

    if (blueprint.value) {
      for (var value of blueprint.value) {
        var item = new ZCEDItem(blueprint);
        item.value = value;
        this.addItem(item);
      }
    }

    if (blueprint.compact) {
      this.itemDom.classList.add("container");
    }
  }

  /**
   * Returns a string that can be used to append to a request when using application/x-www-form-urlencoded
   * @returns {string} The data containing string
   */
  getPostString() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      var out = item.getPostString(this.name, i);
      if (!out) continue;
      str += "&" + out;
    }
    return str;
  }

  /**
   * Appends data to a form data object. This form data object can then be used to send the form with multipart/form-data
   * @param {FormData} data An existing FormData object to append to
   * @returns {void}
   */
  getFormData(data) {
    var index = 0;
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.getFormData(data, this.name, index)) {
        index++;
      }
    }

  }

  /**
   * Creates and adds an item with default values to this CED.
   * @returns {void}
   */
  createItem() {
    var item = new ZCEDItem(this.blueprint);
    this.addItem(item);
    this.emit("change");
    return item;
  }

  /**
   * Adds an already existing item to this CED
   * @param {CEDItem} item 
   * @returns {void}
   */
  addItem(item) {
    this.items.push(item);
    item.ced = this;
    this.itemDom.appendChild(item.dom);
  }

  /**
   * Adds an event listener to this object.
   * @param {String} type Type of the event
   * @param {Function} handler Function that is called when the event occours
   * @returns {void}
   */
  on(type, handler) {
    if (!(type in this.listeners)) this.listeners[type] = [];
    this.listeners[type].push(handler);
  }

  /**
   * Emits an event. The implementation is very simple and does not support any event args.
   * 
   * This should only be called privatly.
   * @param {String} type Type of the event
   * @returns {void}
   */
  emit(type) {
    if (type in this.listeners) {
      for (var handler of this.listeners[type]) {
        handler();
      }
    }
  }

  /**
   * Marks a field in the ced item as invalid
   * @param {InvalidError} error The error object. Comes usally from back from the server.
   * @param {number} error.index Index of the item to show the error at
   * @param {string} error.subname Name of the field in the item
   * @returns {void}
   */
  markInvalid(error) {
    this.items[error.index].markInvalid(error);
  }

  /**
   * Marks all fields in the items of the ced as valid
   * @returns {void}
   */
  markValid() {
    for (var item of this.items) {
      item.markValid();
    }
  }
}

/**
 * Class for an item in the CED
 */
class ZCEDItem {

  /**
   * Creates an CED item. Usally these items are created in ZCED.createItem which is recommenden to use when creating items.
   * @param {CEDBlueprint} blueprint Blueprint for an item
   */
  constructor(blueprint) {

    this.dom = document.createElement("div");
    
    if (blueprint.compact) {
      this.dom.classList.add("row");
    } else {
      this.dom.classList.add("card", "m-1", "p-1");
    }

    this.fields = {};
    this.blueprint = blueprint;
    this.ced = null;

    this.dbId = -1;
    this.deleted = false;

    for (var fieldBlueprint of this.blueprint.fields) {
      var field = new ZFormField(fieldBlueprint);
      this.dom.appendChild(field.dom);
      field.on("change", () => {
        this.ced.emit("change");
      });
      this.fields[field.name] = field;
    }

    var buttonRemove = document.createElement("button");
    buttonRemove.addEventListener("click", () => { 
      this.ced.emit("change");
      this.dom.classList.add("d-none");
      this.deleted = true;
    });
    buttonRemove.innerHTML = "✕";
    buttonRemove.classList.add("btn", "btn-danger");

    this.dom.appendChild(buttonRemove);

    if (blueprint.compact) {
      var removeWrapper = document.createElement("div");
      removeWrapper.classList.add("col-md-1", "col");
      buttonRemove.classList.add("btn-block");
      this.dom.classList.add("form-row");
      removeWrapper.appendChild(buttonRemove);
      this.dom.appendChild(removeWrapper);
    }
  }

  /**
   * Returns a string that can be used to append to a request when using application/x-www-form-urlencoded
   * 
   * For these items additional information needs to be given so it knows where to add itself in the array
   * 
   * @param {string} name The name of the CED
   * @param {number} index Index of this item
   * @returns {string} The data containing string
   */
  getPostString(name, index) {
    var str = "";
    var modifier;

    if (this.deleted) {
      if (this.dbId == -1) return "";
      modifier = "delete";
    } else {
      if (this.dbId == -1) {
        modifier = "create";
      } else {
        modifier = "edit";
      }
    }
    str += name + "[" + index + "][Z]=" + modifier;
    if (this.dbId != -1) str += "&" + name + "[" + index + "][dbId]=" + this.dbId;

    for (var k in this.fields) {
      var field = this.fields[k];
      str += "&" + name + "[" + index + "][" + field.name + "]=<#decURI#>" + encodeURIComponent(field.value);
    }
    return str;
  }

  /**
   * Appends data to a form data object. This form data object can then be used to send the form with multipart/form-data
   * 
   * For these items additional information needs to be given so it knows where to add itself in the array
   * 
   * @param {FormData} data Already existing FormData object
   * @param {string} name The name of the CED
   * @param {number} index Index of this item
   * @returns {string} The data containing string
   */
  getFormData(data, name, index) {
    var key = name + "[" + index + "]";
    var modifier;

    if (this.deleted) {
      if (this.dbId == -1) return false;
      modifier = "delete";
    } else {
      if (this.dbId == -1) {
        modifier = "create";
      } else {
        modifier = "edit";
      }
    }
    data.set(key + "[Z]", modifier);

    if (this.dbId != -1) data.set(key + "[dbId]", this.dbId);

    for (var k in this.fields) {
      var field = this.fields[k];
      data.set(key + "[" + field.name + "]", "<#decURI#>" + encodeURIComponent(field.value));
    }

    return true;
  }

  /**
   * Marks an field in this item as invalid and show the error formatted to the user
   * @param {InvalidError} error Error object that comes from the server
   * @param {string} error.subname Name of the field
   * @returns {void}
   */
  markInvalid(error) {
    this.fields[error.subname].markInvalid(error);
  }

  /**
   * Marks all fields of this item as valid
   * @returns {void}
   */
  markValid() {
    for (var k in this.fields) {
      this.fields[k].markValid();
    }
  }

  /**
   * Value
   * @type {object}
   */
  set value(value) {
    for (var k in value) {
      if (k == "dbId") {
        this.dbId = value[k];
        continue;
      }
      this.fields[k].value = value[k];
    }
  }

}

/**
 * @callback saveHook
 * @param {object} data Data that comes back from the server after submiting.
 */

 /**
 * @callback formErrorHook
 * @param {object} data Data that comes back from the server after submiting.
 */

/**
 * Class that handles all automatic form logic
 */
class ZForm {

  /**
   * Creates a ZForm instance
   * @param {object} options Options
   * @param {boolean} options.doReload Should the form reload after submit? This is automatically set to true when using a CED in the form
   * @param {string} options.dom Id of a dom element to append this form automatically to
   * @param {saveHook} options.saveHook Function that is called after saving. It is only called after a success and not when validation errors occour
   * @param {formErrorHook} options.formErrorHook Function that is only called on form errors
   */
  constructor(options = {
    doReload: true, 
    dom: null, 
    saveHook: null, 
    formErrorHook:null, 
    hidehints: false,
    sendOnSubmitClick: true,
    customEndpoint: null
  }) {
    this.fields = {};
    this.options = options;
    this.ceds = [];

    this.doReload = options.doReload || false;
    this.saveHook = options.saveHook;
    this.formErrorHook = options.formErrorHook;
    this.sendOnSubmitClick = typeof variable === "boolean" ? options.sendOnSubmitClick : true;
    this.customEndpoint = options.customEndpoint || null;

    this.hidehints = options.hidehints;

    this.dom = document.createElement("div");

    this.alert = document.createElement("div");
    this.alert.classList.add("alert", "d-none", "sticky-top");
    this.alert.style.top = "60px";
    this.lastAlertClass = "a";
    this.dom.appendChild(this.alert);

    this.inputSpace = document.createElement("div");
    this.inputSpace.classList.add("form-group");
    this.dom.appendChild(this.inputSpace);

    this.buttonSubmit = document.createElement("button");
    this.buttonSubmit.innerHTML = Z.Lang.submit;
    var that = this;
    this.buttonSubmit.addEventListener("click", function(e) {
      if(that.sendOnSubmitClick) that.send(that.customEndpoint);
    });
    this.buttonSubmit.classList.add("btn", "btn-primary");
    this.dom.appendChild(this.buttonSubmit);

    this.currentRowLength = 12;
    this.currentRow = null;
    this.rows = [];

    if (options.dom) document.getElementById(options.dom).appendChild(this.dom);
  }

  /**
   * Returns a application/x-www-form-urlencoded string to use in requests.
   * @returns {string} The string with the data
   */
  getPostString() {
    var postString = "isFormData=true";
    for (var k in this.fields) {
      var f = this.fields[k];
      postString += "&" + f.getPostString();
      f.markValid();
    }
    return postString;
  }

  /**
   * Returns a FormData object containg data for Post requests.
   * @returns {FormData} object holding the data
   */
  getFormData() {
    var data = new FormData();
    data.set("isFormData", 1);

    for (var k in this.fields) {
      var f = this.fields[k];
      f.getFormData(data);
      f.markValid();
    }
    return data;
  }

  /**
   * Adds custom html to the current part of the Form
   * @returns {void}
   */
  addCustomHTML(html) {
    var node = document.createElement("div");
    node.innerHTML = html;
    this.inputSpace.appendChild(node);
  }

  /**
   * Gathers the information automatically from the form and submits them. This function will reload the page if doReload is true and the submit was a success.
   * @returns {void}
   */
  send(customUrl = null) {
    var data = this.getFormData();

    for (var pair of data.entries()) {
      if(this.debug) console.log(pair[0]+ ', ' + pair[1]); 
    }

    var ajax_options = {
      method: "POST",
      enctype: 'multipart/form-data',
      cache: false,
      contentType: false,
      data: data,
      processData: false
    };

    if(customUrl != null) ajax_options.url = customUrl;

    $.ajax(ajax_options).done((data) => {
      var json;

      if(this.debug) console.log(data);
      
      try {
        json = JSON.parse(data);
      } catch (e) {
        json = {result: "error"};
      }

      if (json.result == "success") {
        if (this.saveHook) {
          this.saveHook(json);
        }

        if (this.doReload) window.location.reload();
        this.hint("alert-success", Z.Lang.saved);
      } else if (json.result == "formErrors") {
        for (var error of json.formErrors) {
          if(this.fields[error.name]) {
            this.fields[error.name].markInvalid(error);
          }
        }
        if (this.formErrorHook) {
          this.formErrorHook(json);
        }
      } else if (json.result == "error") {
        this.hint("alert-danger", Z.Lang.saveError);
      }

    });
  }

  /**
   * Adds an already existing field to the form
   * @param {(ZFormField|ZCED)} field Field to add
   * @returns {void}
   */
  addField(field) {
    if (field.type == "CED") this.doReload = true;

    this.fields[field.name] = field;
    field.on('change', () => {
      this.hint("alert-warning", Z.Lang.unsaved);
    });
    bsCustomFileInput.init();

    if (field.width + this.currentRowLength > 12) {
      var group = document.createElement("div");
      group.classList.add("form-group");
      this.currentRow = document.createElement("div");
      this.currentRow.classList.add("form-row");
      group.appendChild(this.currentRow);
      this.inputSpace.appendChild(group);
      this.currentRowLength = 0;
    }

    this.currentRow.appendChild(field.dom);
    this.currentRowLength += field.width;
  }

  /**
   * Creates an CED and adds it directly to the form.
   * @param {CEDBlueprint} blueprint The blueprint that defines the attributes of the CED
   * @return {ZCED} The newly generated CED
   */
  createCED(blueprint) {
    var ced = new ZCED(blueprint);
    this.addField(ced);
    return ced;
  }

  /**
   * Creates and adds a ZFormField to the form
   * @param {FormFieldOptions} options for the new Field
   * @returns {ZFormField} The newly created field
   */
  createField(options) {
    var field = new ZFormField(options);
    this.addField(field);
    return field;
  }

  /**
   * Adds an empty space to the form just as spacer.
   * @param {FieldWidth} size Size of the field
   * @returns {void}
   */
  createEmpty(size = 12) {
    var div = document.createElement("div");
    div.classList.add("col-0", "col-md-" + size);
    this.inputSpace.appendChild(div);
  }

  /**
   * Adds an <hr> tag at the end of the generated form
   * @returns {void}
   */
  addSeperator() {
    this.inputSpace.appendChild(document.createElement("hr"));
  }

  /**
   * Sets the alert that is shown on top of the form. Used for errors, warnings or hints.
   * @param {string} alertClass Class name of the bootstrap class. For exmaple alert-success or alert-danger.
   * @param {string} content Text to show in the alert
   * @returns {void}
   */
  hint(alertClass, content) {
    if(this.hidehints) return;
    this.alert.classList.remove("d-none", this.lastAlertClass);
    this.alert.classList.add(alertClass);
    this.lastAlertClass = alertClass;
    this.alert.innerHTML = content;
  }

  /**
   * Removes the alert that holds errors, warnings or hints
   * @returns {void}
   */
  unhint() {
    this.alert.classList.add("d-none");
  }

  /**
   * Adds an button to the bottom of the form next to the submit button
   * @param {string} text Content of the button
   * @param {string} style Class for the button. Bootstrap classes like btn-primary or btn-secondary can be used here
   * @param {Function} action Function that is called when the button is clicked
   */
  createActionButton(text, style, action) {
    var button = document.createElement("button");
    button.classList.add("ml-1", "btn", style);
    button.innerHTML = text;
    this.dom.appendChild(button);
    button.addEventListener("click", action);
  }

}

/**
 * @typedef {number} FieldWidth
 * A number from 1 to 12 that defines the width of a field. 12 Is the full width. If a row gets over the lenght of 12 it will break automatically.
 * 
 * The number corresponds to the widths from the bootstrap grid system
 */

/**
 * A dataset for an item in a select of autocomplete box.
 * @typedef {object} Food
 * @property {any} value Value of the option
 * @property {string} text Text to show to the user 
 */

/**
 * Types to use in an input field. All html default ones, textarea, select and autocomplete are supported.
 * @typedef {"button"|"checkbox"|"color"|"date"|"datetime-local"|"email"|"file"|"hidden"|"image"|"month"|"number"|"password"|"radio"|"range"|"reset"|"search"|"submit"|"tel"|"text"|"time"|"url"|"week"|"select"|"textarea"|"autocomplete"} InputType
 */

/**
 * All parameters are optional
 * @typedef FormFieldOptions
 * @property {string} name Name to use in the request
 * @property {boolean} required Sets if this field is required to be filled in
 * @property {InputType} type Type of the field
 * @property {string} text Text to show in the label
 * @property {string} hint Small text to show under the input. For example: "We do not share you email" or something.
 * @property {any} default Default value 
 * @property {boolean} autofill Enable browser level autofill for this field.
 * @property {string} placeholder Placeholder to show in the input when nothing is entered
 * @property {FieldWidth} width Width of the field in units
 * @property {object} attributes List of attributes to apply to the input element. The keys are attribute names and their values will be used as the value
 * @property {Food} food Food for selects or autocomepletes
 * @property {boolean} compact Sets the compact mode. In compact mode, the label is hidden
 * @property {string} prepend Content to put in front of the input. Units are usally put there
 */

/**
 * @class ZFormField
 * Class for a field in a form
 */
class ZFormField {

  /**
   * Creates a new form Field. Usally this called from ZForm.createField and not directly
   * @param {FormFieldOptions} options Options for this field
   */
  constructor(options) {
    zInputIndex++;

    this.options = options;
    this.name = options.name;
    this.isRequired = options.required;
    this.type = options.type;
    this.text = options.text || "&nbsp;";
    this.hint = options.hint;
    this.placeholder = options.placeholder;
    this.default = options.default;
    this.autofill = options.autofill || false;
    this.autocompleteData = options.autocompleteData || [];
    this.autocompleteMinCharacters = options.autocompleteMinCharacters || 2;
    this.autocompleteTextCB = options.autocompleteTextCB;
    this.autocompleteCB = options.autocompleteCB || null;

    this.optgroup = null;

    this.dom = document.createElement("div");
    this.dom.classList.add("col");

    this.label = document.createElement("label");
    this.label.innerHTML = this.text;
    if (this.options.required) {
      this.label.innerHTML += "<span class='text-danger'>*</span>";
      this.label.classList.add("input-required");
    }
    this.label.setAttribute("for", "input-" + zInputIndex);
    this.dom.appendChild(this.label);

    var customDiv = null;

    if (this.type == "file") {                    // --- File upload ---
      customDiv = document.createElement("div");
      customDiv.classList.add("custom-file");
      this.input = document.createElement("input");
      this.input.setAttribute("type", this.type);
      this.input.classList.add("custom-file-input");
      var l = document.createElement("label");
      l.innerHTML = options.customFileInputText || Z.Lang.choose_file;
      l.classList.add("custom-file-label", "text-truncate");
      customDiv.appendChild(l);
      customDiv.appendChild(this.input);
      this.input.classList.add("form-control");
    } else if (this.type == "select") {           // --- Select ---
      this.input = document.createElement("select");
      var option = document.createElement("option");
      option.setAttribute("disabled", true);
      option.setAttribute("selected", true);
      option.setAttribute("value", "");
      option.innerHTML = "---";
      this.input.classList.add("form-control");
      this.input.appendChild(option);
    } else if (this.type == "textarea") {         // --- Textarea ---
      this.input = document.createElement("textarea");
      this.input.classList.add("form-control");
    } else if (this.type == "button") {           // --- Button ---
      this.input = document.createElement("button");
      this.input.innerHTML = options.value;
      var style = options.style || "btn-primary";
      this.input.classList.add("btn", style, "w-100");
    } else if (this.type == "hidden") {           // --- Hidden ---
      this.input = document.createElement("input");
      this.input.setAttribute("type", "hidden");
      this.dom.classList.add("d-none");
    } else if (this.type == "autocomplete") {     // --- Autocomplete ---
      customDiv = document.createElement("div");

      this.input = document.createElement("input");
      this.input.setAttribute("type", "text");
      this.input.classList.add("form-control");
      
      var completeDiv = document.createElement("div");
      completeDiv.classList.add("list-group");
      customDiv.appendChild(this.input);
      customDiv.appendChild(completeDiv);

      if(!Array.isArray(this.autocompleteData)) {
        this.autocompleteBindingUrl = this.autocompleteData;
      }

      this.lockAutocompleteAge = 0;

      this.input.addEventListener("keyup", (e) => {
        if (e.key == "Shift") return;
        if (e.target.value.length < this.autocompleteMinCharacters) return;

        var currentAge = this.lockAutocompleteAge;

        if(this.autocompleteBindingUrl && e.target.value != "") {
          Z.Request.root(this.autocompleteBindingUrl, "autocomplete", {
            "value": e.target.value
          }, (res) => {
            if(currentAge >= this.lockAutocompleteAge) {
              this.lockAutocompleteAge++;
              this.autocompleteData = res.data;
              console.log(this.autocompleteData);
            }
          });
        }

        completeDiv.innerHTML = "";
        if (e.target.value == "") return;
        if (e.key == "Escape") return;
        
        for (let value of this.autocompleteData) {
          if (value.toLowerCase().includes(e.target.value.toLowerCase())) {
            var item = document.createElement("button");
            item.type = "button";
            item.classList.add("list-group-item");
            item.classList.add("list-group-item-action");
            item.classList.add("py-1");
            if(value.toLowerCase() == e.target.value.toLowerCase()) {
              item.classList.add("text-primary");
            }

            var start = value.toLowerCase().indexOf(e.target.value.toLowerCase());
            var tmp = value.substr(0, start);
            tmp += "<strong>" + value.substr(start, e.target.value.length) + "</strong>";
            tmp += value.substring(start + e.target.value.length, value.length);
            if(this.autocompleteTextCB) {
              tmp = this.autocompleteTextCB(tmp, value);
            }
            item.innerHTML = tmp;

            completeDiv.appendChild(item);
            item.addEventListener("click", e => {
              this.input.value = value;
              completeDiv.innerHTML = "";
              if(this.autocompleteCB) this.autocompleteCB(value);
            });
          }
        }
      });

      document.addEventListener("click", function() {
        completeDiv.innerHTML = "";
      })

    } else {                                      // --- Default ---
      this.input = document.createElement("input");
      this.input.setAttribute("type", this.type);
      this.input.classList.add("form-control");
    }
    this.input.setAttribute("name", this.name);
    this.input.setAttribute("id", "input-" + zInputIndex);
    if (!this.autofill) {
      this.input.setAttribute("autocomplete", "new-password");
    }

    if (this.placeholder) {
      this.input.setAttribute("placeholder", this.placeholder);
    }

    if (options.value) {
      this.value = options.value;
    }

    if (options.width) {
      this.setWidth(options.width);
    } else {
      if (this.type == "hidden") {
        this.setWidth(0);
      } else {
        this.setWidth(12);
      }
    }

    if (options.attributes) {
      for (var k in options.attributes) {
        this.input.setAttribute(k, options.attributes[k]);
      }
    }

    if (customDiv) {
      this.dom.appendChild(customDiv);
    } else {
      this.dom.appendChild(this.input);
    }

    if (options.prepend) {
      var groupWrapper = document.createElement("div");
      groupWrapper.classList.add("input-group");
      var prependDiv = document.createElement("div");
      prependDiv.classList.add("input-group-prepend");
      var prependSpan = document.createElement("span");
      prependSpan.classList.add("input-group-text");
      prependSpan.innerHTML = options.prepend;
      prependDiv.appendChild(prependSpan);
      groupWrapper.appendChild(prependDiv);
      groupWrapper.appendChild(this.input);
      this.dom.appendChild(groupWrapper);
    }

    if (this.hint) {
      this.hintText = document.createElement("span");
      this.hintText.innerHTML = this.hint;
      this.hintText.classList.add("form-text", "text-muted");
      this.dom.appendChild(this.hintText);
    }

    this.errorLabel = document.createElement("span");
    this.errorLabel.classList.add("form-text", "text-danger");
    this.dom.appendChild(this.errorLabel);

    if (options.food) {
      this.feedData(options.food);
    }

    if (options.compact) {
      this.label.classList.add("d-none");
    }
  }

  /**
   * @type {any}
   */
  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  /**
   * Sets the width of a field. Is mostly done in the constructor. Changing the width after constructing may result in weird results.
   * @param {FieldWidth} units The width of the field
   * @returns {void}
   */
  setWidth(units) {
    this.width = units;
    this.dom.classList.add("col-md-" + units);
  }

  /**
   * Adds an event listener to the dom input element. It has the same parameters as addEventListener form DOM objects.
   * @returns {void}
   */
  on() {
    this.input.addEventListener(...arguments);
  }

  /**
   * Marks this field as errorous.
   * @param {InvalidError} error Error containg information about whats wrong
   * @returns {void}
   */
  markInvalid(error) {
    var text = Z.Lang["error_" + error.type];

    if (error.info) {
      for (var i = 0; i < error.info.length; i++) {
        text = text.replace("[" + i + "]", error.info[i]);
      }
    }

    this.errorLabel.innerHTML = text;
    this.input.setCustomValidity(error.type);
    this.input.classList.add("is-invalid");

    this.dom.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  /**
   * Marks this field as valid and removes all error messages from it.
   * @returns {void}
   */
  markValid() {
    this.errorLabel.innerHTML = "";
    this.input.setCustomValidity("");
    this.input.classList.remove("is-invalid");
  }

  /**
   * Feeds the input with data. Used for selects of autocomplete inputs.
   * @param {Food[]} food Data generated with makeFood in PHP
   * @param {=boolean} clear If set, all old data will be cleared before adding the new one
   * @returns {void}
   */
  feedData(food, clear = true) {
    if (this.type != "select") {
      console.warn("Do not feed select data to non select input!");
    }

    if (clear) {
      this.input.innerHTML = '<option value="">---</option>';
    }

    for (var data of food) {
      if(data.type == undefined || data.type == "option") {
        var option = document.createElement("option");
        option.innerHTML = data.text;
        option.setAttribute("value", data.value);
        if(this.optgroup != null) {
          this.optgroup.appendChild(option);
        } else {
          this.input.appendChild(option);
        }
      } else if(data.type == "optgroup") {
        if(this.optgroup != null) this.input.appendChild(this.optgroup);
        this.optgroup = document.createElement("optgroup");
        this.optgroup.setAttribute("label", data.text);
        this.input.appendChild(this.optgroup);
      }
    }

    if(this.optgroup != null) this.input.appendChild(this.optgroup);
    
    if (this.options.value !== undefined) {
      this.value = this.options.value;
    }
  }

  /**
   * Returns a string that can be used to append to a request when using application/x-www-form-urlencoded
   * @returns {string} The data containing string
   */
  getPostString() {
    return this.name + "=<#decURI#>" + encodeURIComponent(this.value);
  }

  /**
   * Appends data to a form data object. This form data object can then be used to send the form with multipart/form-data
   * @param {FormData} data An existing FormData object to append to
   * @returns {void}
   */
  getFormData(data) {
    if (this.type == "file") {
      if (this.input.files[0]) {
        data.append(this.name, this.input.files[0], this.value);
      }
    } else {
      data.set(this.name, "<#decURI#>" + encodeURIComponent(this.value));
    }
  }
}