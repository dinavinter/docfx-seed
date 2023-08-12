/*
 * Communication Collector
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Swashbuckle.AspNetCore.SwaggerGen;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using IO.Swagger.Attributes;
// using IO.Swagger.Security;
using Microsoft.AspNetCore.Authorization;
using IO.Swagger.Models;

namespace IO.Swagger.Controllers
{ 
    /// <summary>
    /// 
    /// </summary>
    [ApiController]
    public class DefaultApiController : ControllerBase
    { 
        /// <summary>
        /// 
        /// </summary>
        /// <remarks>Commit the transaction and update the account.</remarks>
        /// <param name="transactionId"></param>
        /// <param name="collectorConfig"></param>
        /// <response code="200">Ok, account updated with specfic transction details.</response>
        /// <response code="401">Access token is missing or invalid.</response>
        [HttpPut]
        [Route("/accounts/v1/me/collectors/{collector-config}/{transactionId}/commit")]
        [ValidateModelState]
        [SwaggerOperation("CommitCollectorRequest")]
        [SwaggerResponse(statusCode: 401, type: typeof(InlineResponse401), description: "Access token is missing or invalid.")]
        public virtual IActionResult CommitCollectorRequest([FromRoute][Required]string transactionId, [FromRoute][Required]string collectorConfig)
        { 
            //TODO: Uncomment the next line to return response 200 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(200);

            //TODO: Uncomment the next line to return response 401 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(401, default(InlineResponse401));

            throw new NotImplementedException();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <remarks>Intiate collector interaction with user data</remarks>
        /// <param name="collectorConfig"></param>
        /// <param name="body"></param>
        /// <response code="201">Submit form</response>
        [HttpPost]
        [Route("/accounts/v1/me/collectors/{collector-config}")]
        [ValidateModelState]
        [SwaggerOperation("GetCommunicationCollector")]
        [SwaggerResponse(statusCode: 201, type: typeof(Transaction), description: "Submit form")]
        public virtual IActionResult GetCommunicationCollector([FromRoute][Required]string collectorConfig, [FromBody]SchemaDefinition body)
        { 
            //TODO: Uncomment the next line to return response 201 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(201, default(Transaction));
            string exampleJson = null;
            exampleJson = "{\n  \"transactionId\" : \"transactionId\"\n}";
            
                        var example = exampleJson != null
                        ? JsonConvert.DeserializeObject<Transaction>(exampleJson)
                        : default(Transaction);            //TODO: Change the data returned
            return new ObjectResult(example);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="requestUri"></param>
        /// <response code="201">Token created.</response>
        [HttpPost]
        [Route("/oauth/authorize/{request_uri}")]
        [ValidateModelState]
        [SwaggerOperation("OauthAuthorizeRequestUriPost")]
        [SwaggerResponse(statusCode: 201, type: typeof(InlineResponse201), description: "Token created.")]
        public virtual IActionResult OauthAuthorizeRequestUriPost([FromRoute][Required]string requestUri)
        { 
            //TODO: Uncomment the next line to return response 201 or use other options such as return this.NotFound(), return this.BadRequest(..), ...
            // return StatusCode(201, default(InlineResponse201));
            string exampleJson = null;
            exampleJson = "{\n  \"expires_in\" : 60,\n  \"token\" : \"token\"\n}";
            
                        var example = exampleJson != null
                        ? JsonConvert.DeserializeObject<InlineResponse201>(exampleJson)
                        : default(InlineResponse201);            //TODO: Change the data returned
            return new ObjectResult(example);
        }
    }
}
