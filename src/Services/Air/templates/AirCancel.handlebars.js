module.exports = `
<soapenv:Envelope
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns:univ="http://www.travelport.com/schema/universal_v39_0"
  xmlns:com="http://www.travelport.com/schema/common_v39_0"
  xmlns:air="http://www.travelport.com/schema/air_v39_0"
  >
  <soapenv:Header/>
  <soapenv:Body>
    <univ:AirCancelReq
      AuthorizedBy="user" TargetBranch="{{TargetBranch}}"
      RetrieveProviderReservationDetails="false" Version="{{version}}"
      >
      <com:BillingPointOfSaleInfo OriginApplication="uAPI" />
      {{#if emulatePcc}}
      <com:OverridePCC ProviderCode="1G" PseudoCityCode="{{emulatePcc}}"/>
      {{/if}}
      <air:AirReservationLocatorCode>{{uapi_reservation_locator}}</air:AirReservationLocatorCode>
      {{#trips}}
      <air:AirSegmentRef Key="{{{uapi_segment_ref}}}"/>
      {{/trips}}
    </univ:AirCancelReq>
  </soapenv:Body>
</soapenv:Envelope>
`;
