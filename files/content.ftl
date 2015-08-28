<#--
Body section of the GetFeatureInfo template, it's provided with one feature collection, and
will be called multiple times if there are various feature collections
-->
<div style="background-color: #EE8021; ">
<table><tr><td><img src="/mapa_pruebas/img/subse-blanco.png"  ></td>
<td width=90%>&nbsp;</td>
<td><img src="/mapa_pruebas/img/ide-blanca.png"  ></td>
</tr>
</table>
</div>
<div>
<table class="featureInfo">
  <!--caption class="featureInfo">Info de la capa ${type.name}</caption -->

<#list features as feature>

  
<#list feature.attributes as attribute>
 <#if !attribute.isGeometry>
  <tr>
    <th >${attribute.name}</th>
    <td>${attribute.value}</td>
  </tr>
 </#if>

</#list>
</#list>
</table>
</div>
