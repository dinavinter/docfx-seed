const toOpenApi = require('json-schema-to-openapi-schema');
const fs = require("fs");

const schema =  {
        "id": "http://sirenspec.org/schema#",
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "Entity",
        "description": "An Entity is a URI-addressable resource that has properties and actions associated with it. It may contain sub-entities and navigational links.",
        "type": "object",
        "properties": {
            "class": {
                "description": "Describes the nature of an entity's content based on the current representation. Possible values are implementation-dependent and should be documented.",
                "type": "array",
                "items": {
                    "type": "string"
                }
            },
            "title": {
                "description": "Descriptive text about the entity.",
                "type": "string"
            },
            "properties": {
                "description": "A set of key-value pairs that describe the state of an entity.",
                "type": "object"
            },
            "entities": {
                "description": "A collection of related sub-entities. If a sub-entity contains an href value, it should be treated as an embedded link. Clients may choose to optimistically load embedded links. If no href value exists, the sub-entity is an embedded entity representation that contains all the characteristics of a typical entity. One difference is that a sub-entity MUST contain a rel attribute to describe its relationship to the parent entity.",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/SubEntity"
                }
            },
            "actions": {
                "description": "A collection of actions; actions show available behaviors an entity exposes.",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Action"
                }
            },
            "links": {
                "description": "A collection of items that describe navigational links, distinct from entity relationships. Link items should contain a `rel` attribute to describe the relationship and an `href` attribute to point to the target URI. Entities should include a link `rel` to `self`.",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/Link"
                }
            }
        },
        "definitions": {
            "SubEntity": {
                "anyOf": [
                    { "$ref": "#/definitions/EmbeddedLinkSubEntity" },
                    { "$ref": "#/definitions/EmbeddedRepresentationSubEntity" }
                ]
            },
            "EmbeddedLinkSubEntity": {
                "type": "object",
                "required": [ "rel", "href" ],
                "properties": {
                    "class": {
                        "description": "Describes the nature of an entity's content based on the current representation. Possible values are implementation-dependent and should be documented.",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "rel": {
                        "description": "Defines the relationship of the sub-entity to its parent, per Web Linking (RFC5899).",
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/RelValue"
                        },
                        "minItems": 1
                    },
                    "href": {
                        "description": "The URI of the linked sub-entity.",
                        "type": "string",
                        "format": "uri"
                    },
                    "type": {
                        "$ref": "#/definitions/MediaType"
                    },
                    "title": {
                        "description": "Descriptive text about the entity.",
                        "type": "string"
                    }
                }
            },
            "EmbeddedRepresentationSubEntity": {
                "allOf": [
                    {
                        "$ref": "#"
                    },
                    {
                        "required": [ "rel" ],
                        "properties": {
                            "rel": {
                                "description": "Defines the relationship of the sub-entity to its parent, per Web Linking (RFC5899).",
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/RelValue"
                                },
                                "minItems": 1
                            }
                        }
                    }
                ]
            },
            "Action": {
                "description": "Actions show available behaviors an entity exposes.",
                "type": "object",
                "required": [
                    "name",
                    "href"
                ],
                "properties": {
                    "class": {
                        "description": "Describes the nature of an action based on the current representation. Possible values are implementation-dependent and should be documented.",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "name": {
                        "description": "A string that identifies the action to be performed. Action names MUST be unique within the set of actions for an entity. The behaviour of clients when parsing a Siren document that violates this constraint is undefined.",
                        "type": "string"
                    },
                    "method": {
                        "description": "An enumerated attribute mapping to a protocol method. For HTTP, these values may be GET, PUT, POST, DELETE, or PATCH. As new methods are introduced, this list can be extended. If this attribute is omitted, GET should be assumed.",
                        "type": "string",
                        "enum": [
                            "DELETE",
                            "GET",
                            "PATCH",
                            "POST",
                            "PUT"
                        ],
                        "default": "GET"
                    },
                    "href": {
                        "description": "The URI of the action.",
                        "type": "string",
                        "format": "uri"
                    },
                    "title": {
                        "description": "Descriptive text about the action.",
                        "type": "string"
                    },
                    "type": {
                        "description": "The encoding type for the request. When omitted and the fields attribute exists, the default value is `application/x-www-form-urlencoded`.",
                        "type": "string",
                        "default": "application/x-www-form-urlencoded"
                    },
                    "fields": {
                        "description": "A collection of fields.",
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/Field"
                        }
                    }
                }
            },
            "Field": {
                "description": "Fields represent controls inside of actions.",
                "type": "object",
                "required": [
                    "name"
                ],
                "properties": {
                    "name": {
                        "description": "A name describing the control. Field names MUST be unique within the set of fields for an action. The behaviour of clients when parsing a Siren document that violates this constraint is undefined.",
                        "type": "string"
                    },
                    "type": {
                        "description": "The input type of the field. This is a subset of the input types specified by HTML5.",
                        "type": "string",
                        "default": "text",
                        "enum": [
                            "hidden",
                            "text",
                            "search",
                            "tel",
                            "url",
                            "email",
                            "password",
                            "datetime",
                            "date",
                            "month",
                            "week",
                            "time",
                            "datetime-local",
                            "number",
                            "range",
                            "color",
                            "checkbox",
                            "radio",
                            "file"
                        ]
                    },
                    "title": {
                        "description": "Textual annotation of a field. Clients may use this as a label.",
                        "type": "string"
                    },
                    "value": {
                        "description": "A value assigned to the field.  May be a scalar value or a list of value objects.",
                        "oneOf": [
                            {
                                "type": [ "string", "number" ]
                            },
                            {
                                "type": "array",
                                "items": {
                                    "$ref": "#/definitions/FieldValueObject"
                                }
                            }
                        ]
                    }
                }
            },
            "FieldValueObject": {
                "description": "Value objects represent multiple selectable field values. Use in conjunction with field `\"type\" = \"radio\"` and `\"type\" = \"checkbox\"` to express that zero, one or many out of several possible values may be sent back to the server.",
                "type": "object",
                "required": [ "value" ],
                "properties": {
                    "title": {
                        "description": "Textual description of a field value.",
                        "type": "string"
                    },
                    "value": {
                        "description": "Possible value for the field.",
                        "type": [ "string", "number" ]
                    },
                    "selected": {
                        "description": "A value object with a `\"selected\" = true` attribute indicates that this value should be considered preselected by the client. When missing, the default value is `false`.",
                        "type": "boolean",
                        "default": false
                    }
                }
            },
            "Link": {
                "description": "Links represent navigational transitions.",
                "type": "object",
                "required": [
                    "rel",
                    "href"
                ],
                "properties": {
                    "class": {
                        "description": "Describes aspects of the link based on the current representation. Possible values are implementation-dependent and should be documented.",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "title": {
                        "description": "Text describing the nature of a link.",
                        "type": "string"
                    },
                    "rel": {
                        "description": "Defines the relationship of the link to its entity, per Web Linking (RFC5988).",
                        "type": "array",
                        "items": {
                            "$ref": "#/definitions/RelValue"
                        }
                    },
                    "href": {
                        "description": "The URI of the linked resource.",
                        "type": "string",
                        "format": "uri"
                    },
                    "type": {
                        "$ref": "#/definitions/MediaType"
                    }
                }
            },
            "MediaType": {
                "description": "Defines media type of the linked resource, per Web Linking (RFC5988). For the syntax, see RFC2045 (section 5.1), RFC4288 (section 4.2), RFC6838 (section 4.2)",
                "type": "string",
                "pattern": "^(application|audio|image|message|model|multipart|text|video)\\/([A-Z]|[a-z]|[0-9]|[\\!\\#\\$\\&\\.\\+\\-\\^\\_]){1,127}(; ?(([\\!\\#\\$\\%\\&\\'\\(\\)\\*\\+-\\.\\/]|[0-9]|[A-Z]|[\\^\\_\\`\\]\\|]|[a-z]|[\\|\\~])+)+=((([\\!\\#\\$\\%\\&\\'\\(\\)\\*\\+-\\.\\/]|[0-9]|[A-Z]|[\\^\\_\\`\\]\\|]|[a-z]|[\\|\\~])+)|\"([\\!\\#\\$\\%\\&\\.\\(\\)\\*\\+\\,\\-\\.\\/]|[0-9]|[\\:\\;\\<\\=\\>\\?\\@]|[A-Z]|[\\[\\\\\\]\\^\\_\\`]|[a-z]|[\\{\\|\\}\\~])+\"))*$"
            },
            "RelValue": {
                "anyOf": [
                    {
                        "type": "string",
                        "format": "uri"
                    },
                    {
                        "type": "string",
                        "enum": [
                            "about",
                            "alternate",
                            "appendix",
                            "archives",
                            "author",
                            "blocked-by",
                            "bookmark",
                            "canonical",
                            "chapter",
                            "collection",
                            "contents",
                            "convertedFrom",
                            "copyright",
                            "create-form",
                            "current",
                            "derivedfrom",
                            "describedby",
                            "describes",
                            "disclosure",
                            "dns-prefetch",
                            "duplicate",
                            "edit",
                            "edit-form",
                            "edit-media",
                            "enclosure",
                            "first",
                            "glossary",
                            "help",
                            "hosts",
                            "hub",
                            "icon",
                            "index",
                            "item",
                            "last",
                            "latest-version",
                            "license",
                            "lrdd",
                            "memento",
                            "monitor",
                            "monitor-group",
                            "next",
                            "next-archive",
                            "nofollow",
                            "noreferrer",
                            "original",
                            "payment",
                            "pingback",
                            "preconnect",
                            "predecessor-version",
                            "prefetch",
                            "preload",
                            "prerender",
                            "prev",
                            "preview",
                            "previous",
                            "prev-archive",
                            "privacy-policy",
                            "profile",
                            "related",
                            "restconf",
                            "replies",
                            "search",
                            "section",
                            "self",
                            "service",
                            "start",
                            "stylesheet",
                            "subsection",
                            "successor-version",
                            "tag",
                            "terms-of-service",
                            "timegate",
                            "timemap",
                            "type",
                            "up",
                            "version-history",
                            "via",
                            "webmention",
                            "working-copy",
                            "working-copy-of"
                        ]
                    }
                ]
            }
        }
    }

    
;

const convertedSchema = toOpenApi(schema);
fs.writeFile('openapi.json', JSON.stringify(convertedSchema), 'utf8', console.log);
 