<#--
Body section of the GetFeatureInfo template, it's provided with one feature collection, and
will be called multiple times if there are various feature collections
-->
<table class="featureInfo">
  <caption class="featureInfo"></caption>

  <tr>
<#list type.attributes as attribute>
  <#if !attribute.isGeometry>
  <#if !attribute.fid>
    <th >${attribute.name}</th>
  </#if>
  </#if>
</#list>
    <th>Caratula</th>
    <th>Folio(*) </th>
  </tr>

<#assign odd = false>
<#list features as feature>
  <#if odd>
    <tr class="odd">
  <#else>
    <tr>
  </#if>
  <#assign odd = !odd>

  <#list feature.attributes as attribute>
  <#if !attribute.isGeometry>
    <#if !attribute.fid>
      <td>${attribute.value}</td>
    </#if>
  </#if>
  </#list>
	<td><a href='/caratula.php?idfolio={feature.attributes.cod_depto.value}<'>Descargar</a></td>
	<td><a href='caratula.php?idfolio=&foliocompleto'>Descargar (usuarios registrados)</a></td>
  </tr>
</#list>
</table>
<br/>
