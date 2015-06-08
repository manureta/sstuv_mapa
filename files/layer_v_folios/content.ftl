<#--
Body section of the GetFeatureInfo template, it's provided with one feature collection, and
will be called multiple times if there are various feature collections
-->
<table class="featureInfo">
  <caption class="featureInfo">Info de la capa ${type.name}</caption>

  <tr>
<#list type.attributes as attribute>
  <#if !attribute.isGeometry>
    <th >${attribute.name}</th>
  </#if>
</#list>
    <th>Caratula</th>
    <th>Legajo(*) </th>
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
      <td>${attribute.value}</td>
    </#if>
  </#list>
	<td><a href='#'>Descarga ${feature.attributes.cod_depto.value}</a></td>
	<td><a href='#'>Descarga (usuarios registrados)</a></td>
  </tr>
</#list>
</table>
<br/>
