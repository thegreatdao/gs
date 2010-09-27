<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<title>Green Solar landing page</title>
		<link rel="stylesheet" href="<c:url value="/css/reset.css" />" />
		<link rel="stylesheet" href="<c:url value="/css/text.css" />" />
		<link rel="stylesheet" href="<c:url value="/css/960.css" />" />
		<link rel="stylesheet" href="<c:url value="/css/main.css" />" />
		<script type="text/javascript" src="<c:url value="/js/jquery-1.4.2.min.js" />"></script>
		<script type="text/javascript" src="<c:url value="/js/jquery.slices.1.2.js" />"></script>
	</head>
	<body>
		<div class="container_12">
			<div id="left_shadow">
				<div id="right_shadow">
					<div class="grid_12" id="header">
						<div id="logo">
							<img src="<c:url value="/images/gs.png"/>"/>		
						</div>
						<div id="right_header">
							<div id="languages">
								<a href="?locale=en_us"  title="<fmt:message key="lang.en"/>" ><img src="<c:url value="/images/us.png"/>" /></a>
								<a href="?locale=zh_CN"  title="<fmt:message key="lang.cn"/>" ><img src="<c:url value="/images/cn.png"/>" /></a>
							</div>
							<form>
								<div>
									<input type="text"/>
									<input type="submit" value="Search"/>								
								</div>
							</form>
						</div>
					</div>
					<div class="clear"></div>
					<div class="grid_12">
						<div  id="products_header"></div>
					</div>
					<div class="clear"></div>					
					<div class="grid_12" id="products">
						<ul style="display: none;">
	                        <li><img src="<c:url value="/images/products/solar2.png"/>"/></li>
							<li><img src="<c:url value="/images/products/solar.png"/>"/></li>
	                    </ul>
					</div>
					<div class="clear"></div>
					<div class="grid_12">
						<div id="main_menu_wrapper">
							<ul id="main_menu">
								<li id="main_menu_first"><a href="javascript:void(0);"><fmt:message key="home"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="products"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="about.us"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="contact.us"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="blog"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="forum"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="links"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="faqs"/></a></li>
								<li><a href="javascript:void(0);"><fmt:message key="work"/></a></li>
								<li id="main_menu_last"><a href="javascript:void(0);"><fmt:message key="desclaimer"/></a></li>
							</ul>
						</div>
					</div>
					<div class="clear"></div>
					<div id="main_body">						
						<tiles:insertAttribute name="body" />
						<tiles:insertAttribute name="nav" />
					</div>
					<div class="clear"></div>
					<div class="grid_12">
						<div id="footer">
							green solar &copy; 2010.
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			$(
				function()
				{
					$("#products").slicer({
						direction: 'bottomUp',
						sliceDelay: 200,
						delay: 6000,
						numberOfSlices: 10,
	                  });
				}
			)						
		</script>
		
	</body>

</html>